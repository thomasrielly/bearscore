<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.API_BASE_URL
definePageMeta({
  layout: 'empty',
  title: 'Login',
})

const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'A valid email is required',
  PASSWORD_REQUIRED: 'A password is required',
}

// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z.object({
  email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
  password: z.string().min(1, VALIDATION_TEXT.PASSWORD_REQUIRED),
  trustDevice: z.boolean(),
})

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  email: '',
  password: '',
  trustDevice: false,
}))

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
  meta,
  values,
  errors,
  resetForm,
  setFieldValue,
  setErrors,
} = useForm({
  validationSchema,
  initialValues,
})

const router = useRouter()

// This is where you would send the form data to the server
const onSubmit = handleSubmit(async (values) => {

  try {
    const response: any = await $fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      body: {
        email: values.email,
        password: values.password,
      },
    })
    localStorage.setItem('mb_token', (response as any).access_token)

  } catch (error: any) {
    setFieldError('password', 'Invalid credentials')
    return
  }

  router.push('/')
})
</script>

<template>
  <div class="dark:bg-muted-800 flex min-h-screen bg-white">
    <div class="relative flex flex-1 flex-col justify-center px-6 py-12 lg:w-2/5 lg:flex-none">
      <div class="dark:bg-muted-800 relative mx-auto w-full max-w-sm bg-white">
        <!--Nav-->
        <div class="flex w-full items-center justify-between">
          <NuxtLink to="/"
            class="text-muted-400 hover:text-primary-500 flex items-center gap-2 font-sans font-medium transition-colors duration-300">
            <Icon name="gg:arrow-long-left" class="h-5 w-5" />
            <span>Back to Home</span>
          </NuxtLink>
          <!--Theme button-->
          <BaseThemeToggle />
        </div>
        <div>
          <BaseHeading as="h2" size="3xl" lead="relaxed" weight="medium" class="mt-6">
            Welcome back.
          </BaseHeading>
        </div>

        <!--Form section-->
        <form method="POST" action="" @submit.prevent="onSubmit" class="mt-6" novalidate>
          <div class="mt-5">
            <div>
              <div class="space-y-4">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="email">
                  <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email"
                    label="Email address" placeholder="Email address" autocomplete="email" :classes="{
                      input: 'h-12',
                    }" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>

                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="password">
                  <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="password"
                    label="Password" placeholder="Password" autocomplete="current-password" :classes="{
                      input: 'h-12',
                    }" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>

              <!--Submit-->
              <div class="mt-6">
                <div class="block w-full rounded-md shadow-sm">
                  <BaseButton :disabled="isSubmitting" :loading="isSubmitting" type="submit" color="primary"
                    class="!h-11 w-full">
                    Sign in
                  </BaseButton>
                </div>
              </div>
            </div>

            <!--No account link-->
            <p class="text-muted-400 mt-4 flex justify-between font-sans text-xs leading-5">
              <NuxtLink to="/auth/signup"
                class=" font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline">
                Don't have an account?
              </NuxtLink>
              <NuxtLink to="/auth/recover"
                class="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline">
                Forgot your password?
              </NuxtLink>
            </p>
          </div>
        </form>
      </div>
    </div>
    <div class="bg-muted-100 dark:bg-muted-900 relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-3/5">
      <div class="mx-auto w-full max-w-4xl">
        <!--Media image-->
        <img class="max-w-md mx-auto" src="/img/illustrations/magician.svg" alt="" width="500" height="500" />
      </div>
    </div>
  </div>
</template>