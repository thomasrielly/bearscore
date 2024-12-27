const demosData = [
  {
    company: "Airbnb",
    logo: "logos:airbnb-icon",
    title: "Airbnb for B2B Sales",
    description: "Airbnb for B2B Sales is a platform designed to help businesses find and book corporate accommodations with ease. This service leverages Airbnb\u2019s extensive network to offer exclusive deals and tailored experiences for corporate clients, ensuring a seamless booking process and superior user experience.",
    tags: [
      "Platform",
      "B2B",
      "Sales"
    ],
    category: "Sales",
    costRange: "10k ~ 20k",
    averageCost: 15e3,
    team: [
      {
        tooltip: "Clark Smith",
        src: "/img/avatars/3.svg"
      },
      {
        tooltip: "Maya Rosselini",
        src: "/img/avatars/2.svg"
      },
      {
        tooltip: "Clarissa Miller",
        src: "/img/avatars/5.svg"
      },
      {
        tooltip: "Jane Doe",
        src: "/img/avatars/4.svg"
      }
    ],
    location: "San Francisco, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 120,
    reviews: [
      {
        username: "John Doe",
        position: "Manager",
        src: "/img/avatars/1.svg",
        location: "New York, NY",
        industry: "Hospitality",
        status: "manager",
        review: "Great service and seamless booking experience.",
        rating: 5
      },
      {
        username: "Jane Smith",
        position: "Director",
        src: "/img/avatars/2.svg",
        location: "Los Angeles, CA",
        industry: "Travel",
        status: "user",
        review: "Exclusive deals and great support.",
        rating: 4
      }
    ],
    overview: "Airbnb is a community marketplace for people to list, discover, and book accommodations around the world.",
    website: "http://airbnb.com",
    industry: "Hospitality",
    companySize: "6,132 employees",
    headquarters: "San Francisco, California, United States",
    subCategory: "Vacation Rentals"
  },
  {
    company: "Slack",
    logo: "logos:slack-icon",
    title: "Slack Enterprise Grid",
    description: "Slack Enterprise Grid is a robust communication platform tailored for large organizations. It provides a secure and scalable environment that integrates seamlessly with existing tools and workflows, facilitating effective communication and collaboration across departments.",
    tags: [
      "Communication",
      "Enterprise",
      "Collaboration"
    ],
    category: "Collaboration",
    costRange: "40k ~ 75k",
    averageCost: 57500,
    team: [
      {
        tooltip: "Hermann Mayer",
        src: "/img/avatars/16.svg"
      },
      {
        tooltip: "Jen Rossi",
        src: "/img/avatars/10.svg"
      }
    ],
    location: "San Francisco, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 89,
    reviews: [
      {
        username: "Alice Brown",
        position: "Software Engineer",
        src: "/img/avatars/3.svg",
        location: "San Francisco, CA",
        industry: "Technology",
        status: "manager",
        review: "Excellent for team communication.",
        rating: 5
      },
      {
        username: "Bob Johnson",
        position: "Project Manager",
        src: "/img/avatars/4.svg",
        location: "Seattle, WA",
        industry: "IT",
        status: "user",
        review: "Seamless integration with our tools.",
        rating: 4
      },
      {
        username: "Carol White",
        position: "Designer",
        src: "/img/avatars/5.svg",
        location: "Portland, OR",
        industry: "Design",
        status: "manager",
        review: "Great for collaboration.",
        rating: 5
      },
      {
        username: "David Black",
        position: "Product Manager",
        src: "/img/avatars/6.svg",
        location: "Austin, TX",
        industry: "Tech",
        status: "user",
        review: "Helps streamline communication and is great for our team where everyone likes to complain about every little problem and my manager is annoying and makes me work overtime.",
        rating: 4
      },
      {
        username: "Emma Green",
        position: "HR Specialist",
        src: "/img/avatars/7.svg",
        location: "Boston, MA",
        industry: "Human Resources",
        status: "manager",
        review: "Facilitates team interaction.",
        rating: 5
      },
      {
        username: "Frank Blue",
        position: "Marketing Director",
        src: "/img/avatars/8.svg",
        location: "Chicago, IL",
        industry: "Marketing",
        status: "user",
        review: "Boosts team productivity.",
        rating: 4
      },
      {
        username: "Grace Red",
        position: "Sales Manager",
        src: "/img/avatars/9.svg",
        location: "Denver, CO",
        industry: "Sales",
        status: "manager",
        review: "Improves communication.",
        rating: 5
      },
      {
        username: "Hank Yellow",
        position: "Support Engineer",
        src: "/img/avatars/10.svg",
        location: "Miami, FL",
        industry: "Support",
        status: "user",
        review: "Enhances workflow.",
        rating: 4
      },
      {
        username: "Irene Purple",
        position: "Consultant",
        src: "/img/avatars/11.svg",
        location: "Dallas, TX",
        industry: "Consulting",
        status: "manager",
        review: "Great for remote teams.",
        rating: 5
      },
      {
        username: "Jack Orange",
        position: "Operations Manager",
        src: "/img/avatars/12.svg",
        location: "Las Vegas, NV",
        industry: "Operations",
        status: "user",
        review: "Very useful for daily tasks.",
        rating: 4
      },
      {
        username: "Jack Black",
        position: "Operations Manager",
        src: "/img/avatars/12.svg",
        location: "Las Vegas, NV",
        industry: "Operations",
        status: "user",
        review: "Very useful for daily tasks.",
        rating: 4
      }
    ],
    overview: "Slack is on a mission to make people's working lives simpler, more pleasant and more productive. It is the productivity platform for customer companies that improves performance by empowering everyone with no-code automation, making search and knowledge sharing seamless, and keeping teams connected and engaged as they move work forward together. As part of Salesforce, Slack is deeply integrated into the Salesforce Customer 360, supercharging productivity across sales, service and marketing teams. To learn more and get started with Slack for free, visit slack.com or connect with us @SlackHQ.\n\nEnsuring a diverse and inclusive workplace where we learn from each other is core to Slack\u2019s values. We welcome people of different backgrounds, experiences, abilities and perspectives. We are an equal opportunity employer and a pleasant and supportive place to work.\n\nCome do the best work of your life here at Slack.",
    website: "http://slack.com",
    industry: "Technology, Information and Internet",
    companySize: "3,443 employees",
    headquarters: "San Francisco, California, United States",
    subCategory: "Information and Internet Enterprise Messaging Software"
  },
  {
    company: "Gitlab",
    logo: "logos:gitlab",
    title: "Gitlab CI/CD",
    description: "Gitlab CI/CD is a comprehensive continuous integration and continuous deployment solution that automates the build, test, and deployment processes. It enables development teams to deliver high-quality software faster by streamlining their workflows and providing powerful tools for version control and code review.",
    tags: [
      "CI/CD",
      "Automation",
      "DevOps"
    ],
    category: "DevOps",
    costRange: "20k ~ 40k",
    averageCost: 3e4,
    team: [
      {
        tooltip: "Alex Wielder",
        src: "/img/avatars/11.svg"
      },
      {
        tooltip: "Rob Howards",
        src: "/img/avatars/18.svg"
      }
    ],
    location: "Brisbane, Australia",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 150,
    reviews: [
      {
        username: "Chris Green",
        position: "DevOps Engineer",
        src: "/img/avatars/5.svg",
        location: "Sydney, Australia",
        industry: "Software",
        status: "manager",
        review: "Streamlines our CI/CD processes.",
        rating: 5
      },
      {
        username: "Dana White",
        position: "Software Developer",
        src: "/img/avatars/6.svg",
        location: "Melbourne, Australia",
        industry: "Tech",
        status: "user",
        review: "Powerful tools for version control.",
        rating: 4
      }
    ],
    overview: "GitLab is a web-based DevOps lifecycle tool that provides a Git-repository manager, wiki, issue-tracking, and CI/CD pipeline features, using an open-source license.",
    website: "http://gitlab.com",
    industry: "Software Development",
    companySize: "1,300 employees",
    headquarters: "San Francisco, California, United States",
    subCategory: "Continuous Integration and Deployment"
  },
  {
    company: "Google",
    logo: "logos:google-icon",
    title: "Google Cloud AI",
    description: "Google Cloud AI offers a suite of machine learning and artificial intelligence services that empower businesses to build and deploy intelligent applications. From pre-trained models to custom solutions, Google Cloud AI helps organizations leverage AI to drive innovation and efficiency.",
    tags: [
      "Cloud",
      "AI",
      "Machine Learning"
    ],
    category: "Analytics",
    costRange: "75k+",
    averageCost: 1e5,
    team: [
      {
        tooltip: "Clarence Bodicker",
        src: "/img/avatars/13.svg"
      },
      {
        tooltip: "Andrew Holmes",
        src: "/img/avatars/14.svg"
      }
    ],
    location: "Mountain View, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 200,
    reviews: [
      {
        username: "Eve Adams",
        position: "Data Scientist",
        src: "/img/avatars/7.svg",
        location: "Mountain View, CA",
        industry: "Tech",
        status: "manager",
        review: "Fantastic AI services.",
        rating: 5
      },
      {
        username: "Frank Black",
        position: "Machine Learning Engineer",
        src: "/img/avatars/8.svg",
        location: "Sunnyvale, CA",
        industry: "AI",
        status: "user",
        review: "Great tools for AI projects.",
        rating: 4
      }
    ],
    overview: "Google is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
    website: "http://google.com",
    industry: "Technology",
    companySize: "139,995 employees",
    headquarters: "Mountain View, California, United States",
    subCategory: "Cloud Services and AI"
  },
  {
    company: "Atlassian",
    logo: "logos:atlassian",
    title: "Jira Software",
    description: "Jira Software by Atlassian is a powerful project management tool designed for agile teams. It offers features for planning, tracking, and releasing software, making it easier for teams to collaborate and stay aligned with their goals.",
    tags: [
      "Project Management",
      "Agile",
      "Collaboration"
    ],
    category: "IT",
    costRange: "20k ~ 40k",
    averageCost: 3e4,
    team: [
      {
        tooltip: "Sam Brettman",
        src: "/img/avatars/15.svg"
      },
      {
        tooltip: "Elina Wheeler",
        src: "/img/avatars/9.svg"
      }
    ],
    location: "Sydney, Australia",
    video: "https://www.youtube.com/watch?v=uhM_v2I6lWg",
    likes: 95,
    reviews: [
      {
        username: "Grace Lee",
        position: "Scrum Master",
        src: "/img/avatars/9.svg",
        location: "Sydney, Australia",
        industry: "Software",
        status: "manager",
        review: "Essential for agile teams.",
        rating: 5
      },
      {
        username: "Henry Ford",
        position: "Product Manager",
        src: "/img/avatars/10.svg",
        location: "Melbourne, Australia",
        industry: "IT",
        status: "user",
        review: "Great for project tracking.",
        rating: 4
      }
    ],
    overview: "Atlassian is a company that provides enterprise software for teams. It develops products for software developers, project managers, and content management.",
    website: "http://atlassian.com",
    industry: "Software",
    companySize: "5,752 employees",
    headquarters: "Sydney, Australia",
    subCategory: "Project Management Software"
  },
  {
    company: "Dribbble",
    logo: "logos:dribbble-icon",
    title: "Dribbble Pro",
    description: "Dribbble Pro is a premium service that offers enhanced tools and features for designers. It provides a platform for showcasing portfolios, finding job opportunities, and connecting with the global design community.",
    tags: [
      "Design",
      "Portfolio",
      "Networking"
    ],
    category: "Content",
    costRange: "10k ~ 20k",
    averageCost: 15e3,
    team: [
      {
        tooltip: "John Baxter",
        src: "/img/avatars/6.svg"
      },
      {
        tooltip: "Maya Rosselini",
        src: "/img/avatars/2.svg"
      }
    ],
    location: "Wellington, New Zealand",
    video: "https://www.youtube.com/watch?v=Vu90oMca10w",
    likes: 130,
    reviews: [
      {
        username: "Ian Curtis",
        position: "Designer",
        src: "/img/avatars/11.svg",
        location: "Wellington, New Zealand",
        industry: "Design",
        status: "manager",
        review: "Perfect for showcasing my work.",
        rating: 5
      },
      {
        username: "Jackie Chan",
        position: "Graphic Designer",
        src: "/img/avatars/12.svg",
        location: "Auckland, New Zealand",
        industry: "Graphics",
        status: "user",
        review: "Great platform for networking.",
        rating: 4
      }
    ],
    overview: "Dribbble is a community of designers sharing screenshots of their work, process, and projects.",
    website: "http://dribbble.com",
    industry: "Design",
    companySize: "150 employees",
    headquarters: "Wellington, New Zealand",
    subCategory: "Design Community"
  },
  {
    company: "Figma",
    logo: "logos:figma",
    title: "Figma Team",
    description: "Figma Team is a collaborative interface design tool that allows teams to create, test, and ship designs from start to finish. Its real-time collaboration features enable designers to work together seamlessly, making it easier to produce high-quality designs quickly.",
    tags: [
      "Design",
      "Collaboration",
      "Interface"
    ],
    category: "Content",
    costRange: "40k ~ 75k",
    averageCost: 57500,
    team: [
      {
        tooltip: "Edward Rowell",
        src: "/img/avatars/8.svg"
      },
      {
        tooltip: "Nick Kowalski",
        src: "/img/avatars/17.svg"
      }
    ],
    location: "San Francisco, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 180,
    reviews: [
      {
        username: "Laura Palmer",
        position: "UX Designer",
        src: "/img/avatars/13.svg",
        location: "San Francisco, CA",
        industry: "Design",
        status: "manager",
        review: "Excellent for team collaboration.",
        rating: 5
      },
      {
        username: "Mike Johnson",
        position: "UI Designer",
        src: "/img/avatars/14.svg",
        location: "Los Angeles, CA",
        industry: "Interface",
        status: "user",
        review: "Great tool for design projects.",
        rating: 4
      }
    ],
    overview: "Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows.",
    website: "http://figma.com",
    industry: "Design",
    companySize: "500 employees",
    headquarters: "San Francisco, California, United States",
    subCategory: "Collaborative Design Tools"
  },
  {
    company: "Airtable",
    logo: "logos:airtable",
    title: "Airtable Automations",
    description: "Airtable Automations allows users to automate their workflows within Airtable. It helps in creating custom automations to streamline processes, send notifications, and integrate with other tools, enhancing productivity and efficiency.",
    tags: [
      "Automation",
      "Productivity",
      "Integration"
    ],
    category: "IT",
    costRange: "< 10k",
    averageCost: 5e3,
    team: [
      {
        tooltip: "Edward Rowell",
        src: "/img/avatars/8.svg"
      },
      {
        tooltip: "Nick Kowalski",
        src: "/img/avatars/17.svg"
      },
      {
        tooltip: "John Baxter",
        src: "/img/avatars/6.svg"
      },
      {
        tooltip: "Maya Rosselini",
        src: "/img/avatars/2.svg"
      }
    ],
    location: "San Francisco, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 110,
    reviews: [
      {
        username: "Olivia Martinez",
        position: "Operations Manager",
        src: "/img/avatars/15.svg",
        location: "San Francisco, CA",
        industry: "Automation",
        status: "manager",
        review: "Streamlines our workflows.",
        rating: 5
      },
      {
        username: "Peter Brown",
        position: "Productivity Specialist",
        src: "/img/avatars/16.svg",
        location: "New York, NY",
        industry: "Productivity",
        status: "user",
        review: "Great for automating tasks.",
        rating: 4
      }
    ],
    overview: "Airtable is a cloud-based spreadsheet-database hybrid that allows users to create and manage tables and data through a web browser.",
    website: "http://airtable.com",
    industry: "Software",
    companySize: "750 employees",
    headquarters: "San Francisco, California, United States",
    subCategory: "Productivity Software"
  },
  {
    company: "Apple",
    logo: "logos:apple",
    title: "Apple Business Manager",
    description: "Apple Business Manager is a web-based portal that helps IT administrators deploy iOS, macOS, and tvOS devices. It allows organizations to buy content, configure device settings, and manage Apple IDs.",
    tags: [
      "IT",
      "Device Management",
      "Configuration"
    ],
    category: "IT",
    costRange: "40k ~ 75k",
    averageCost: 6e4,
    team: [
      {
        tooltip: "Alice Johnson",
        src: "/img/avatars/19.svg"
      },
      {
        tooltip: "Bob Brown",
        src: "/img/avatars/20.svg"
      }
    ],
    location: "Cupertino, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 190,
    reviews: [
      {
        username: "Catherine Blake",
        position: "IT Administrator",
        src: "/img/avatars/17.svg",
        location: "Cupertino, CA",
        industry: "IT",
        status: "manager",
        review: "Easy to manage devices.",
        rating: 5
      },
      {
        username: "David Green",
        position: "System Manager",
        src: "/img/avatars/18.svg",
        location: "San Jose, CA",
        industry: "Device Management",
        status: "user",
        review: "Great for managing Apple devices.",
        rating: 4
      }
    ],
    overview: "Apple is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
    website: "http://apple.com",
    industry: "Technology",
    companySize: "147,000 employees",
    headquarters: "Cupertino, California, United States",
    subCategory: "Consumer Electronics"
  },
  {
    company: "Amazon",
    logo: "logos:amazon",
    title: "AWS Cloud Solutions",
    description: "AWS Cloud Solutions provide a wide range of services for computing, storage, and networking. It enables businesses to scale and grow by leveraging cloud technology to build and deploy applications.",
    tags: [
      "Cloud",
      "Computing",
      "Networking"
    ],
    category: "IT",
    costRange: "75k+",
    averageCost: 12e4,
    team: [
      {
        tooltip: "Catherine Blake",
        src: "/img/avatars/21.svg"
      },
      {
        tooltip: "David Green",
        src: "/img/avatars/22.svg"
      }
    ],
    location: "Seattle, WA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 250,
    reviews: [
      {
        username: "Evan Thomas",
        position: "Cloud Architect",
        src: "/img/avatars/19.svg",
        location: "Seattle, WA",
        industry: "Cloud",
        status: "manager",
        review: "Excellent cloud services.",
        rating: 5
      },
      {
        username: "Fiona Walker",
        position: "Network Engineer",
        src: "/img/avatars/20.svg",
        location: "Bellevue, WA",
        industry: "Networking",
        status: "user",
        review: "Great for networking solutions.",
        rating: 4
      }
    ],
    overview: "Amazon is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    website: "http://amazon.com",
    industry: "E-commerce, Technology",
    companySize: "1,298,000 employees",
    headquarters: "Seattle, Washington, United States",
    subCategory: "Cloud Computing Services"
  },
  {
    company: "PayPal",
    logo: "logos:paypal",
    title: "PayPal Commerce Platform",
    description: "PayPal Commerce Platform is designed to handle payments, manage risk, and streamline operations for businesses of all sizes. It offers tools to help businesses sell online, in person, and across borders.",
    tags: [
      "Payments",
      "Risk Management",
      "E-commerce"
    ],
    category: "Commerce",
    costRange: "20k ~ 40k",
    averageCost: 35e3,
    team: [
      {
        tooltip: "Evan Thomas",
        src: "/img/avatars/23.svg"
      },
      {
        tooltip: "Fiona Walker",
        src: "/img/avatars/24.svg"
      }
    ],
    location: "San Jose, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 140,
    reviews: [
      {
        username: "George Harris",
        position: "E-commerce Manager",
        src: "/img/avatars/21.svg",
        location: "San Jose, CA",
        industry: "E-commerce",
        status: "manager",
        review: "Reliable for online payments.",
        rating: 5
      },
      {
        username: "Hannah Lee",
        position: "Risk Manager",
        src: "/img/avatars/22.svg",
        location: "San Francisco, CA",
        industry: "Risk Management",
        status: "user",
        review: "Great risk management tools.",
        rating: 4
      }
    ],
    overview: "PayPal is a global e-commerce business allowing payments and money transfers to be made through the Internet.",
    website: "http://paypal.com",
    industry: "Financial Services",
    companySize: "26,500 employees",
    headquarters: "San Jose, California, United States",
    subCategory: "Online Payment Systems"
  },
  {
    company: "Monday",
    logo: "logos:monday",
    title: "Monday.com Work OS",
    description: "Monday.com Work OS is a flexible platform that powers teams to run projects and workflows with confidence. It allows teams to build, run, and scale their dream workflows on one platform.",
    tags: [
      "Project Management",
      "Workflow",
      "Collaboration"
    ],
    category: "Collaboration",
    costRange: "20k ~ 40k",
    averageCost: 25e3,
    team: [
      {
        tooltip: "George Harris",
        src: "/img/avatars/25.svg"
      },
      {
        tooltip: "Hannah Lee",
        src: "/img/avatars/26.svg"
      }
    ],
    location: "Tel Aviv, Israel",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 160,
    reviews: [
      {
        username: "Ian Curtis",
        position: "Project Manager",
        src: "/img/avatars/23.svg",
        location: "Tel Aviv, Israel",
        industry: "Management",
        status: "manager",
        review: "Essential for managing projects.",
        rating: 5
      },
      {
        username: "Jack Wilson",
        position: "Workflow Specialist",
        src: "/img/avatars/24.svg",
        location: "Jerusalem, Israel",
        industry: "Workflow",
        status: "user",
        review: "Great for workflow management.",
        rating: 4
      }
    ],
    overview: "Monday.com is a cloud-based work operating system, where teams create workflow apps in minutes to run their processes, projects, and everyday work.",
    website: "http://monday.com",
    industry: "Project Management Software",
    companySize: "800 employees",
    headquarters: "Tel Aviv, Israel",
    subCategory: "Work Management Software"
  },
  {
    company: "Spotify",
    logo: "logos:spotify",
    title: "Spotify for Work",
    description: "Spotify for Work offers a curated selection of music and podcasts to boost productivity and morale in the workplace. It includes features for team playlists and integration with office sound systems.",
    tags: [
      "Music",
      "Podcasts",
      "Productivity"
    ],
    category: "Collaboration",
    costRange: "10k ~ 20k",
    averageCost: 15e3,
    team: [
      {
        tooltip: "Irene Murphy",
        src: "/img/avatars/12.svg"
      },
      {
        tooltip: "Jack Wilson",
        src: "/img/avatars/13.svg"
      }
    ],
    location: "Stockholm, Sweden",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 175,
    reviews: [
      {
        username: "Laura Palmer",
        position: "Office Manager",
        src: "/img/avatars/25.svg",
        location: "Stockholm, Sweden",
        industry: "Music",
        status: "manager",
        review: "Boosts our productivity.",
        rating: 5
      },
      {
        username: "Mike Johnson",
        position: "Productivity Specialist",
        src: "/img/avatars/26.svg",
        location: "Gothenburg, Sweden",
        industry: "Productivity",
        status: "user",
        review: "Great for office morale.",
        rating: 4
      }
    ],
    overview: "Spotify is a digital music service that gives you access to millions of songs and podcasts.",
    website: "http://spotify.com",
    industry: "Music Streaming",
    companySize: "6,500 employees",
    headquarters: "Stockholm, Sweden",
    subCategory: "Digital Music and Podcasts"
  },
  {
    company: "Stripe",
    logo: "logos:stripe",
    title: "Stripe Payment Solutions",
    description: "Stripe Payment Solutions offer a suite of APIs that enable businesses to accept and manage online payments. It includes features for billing, invoicing, and fraud prevention.",
    tags: [
      "Payments",
      "APIs",
      "Billing"
    ],
    category: "Commerce",
    costRange: "40k ~ 75k",
    averageCost: 5e4,
    team: [
      {
        tooltip: "Karen Adams",
        src: "/img/avatars/4.svg"
      },
      {
        tooltip: "Larry White",
        src: "/img/avatars/5.svg"
      }
    ],
    location: "San Francisco, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 210,
    reviews: [
      {
        username: "Nina Williams",
        position: "Billing Manager",
        src: "/img/avatars/27.svg",
        location: "San Francisco, CA",
        industry: "Billing",
        status: "manager",
        review: "Excellent payment solutions.",
        rating: 5
      },
      {
        username: "Oscar Allen",
        position: "Fraud Specialist",
        src: "/img/avatars/28.svg",
        location: "San Jose, CA",
        industry: "Fraud Prevention",
        status: "user",
        review: "Great tools for fraud prevention.",
        rating: 4
      }
    ],
    overview: "Stripe is a technology company that builds economic infrastructure for the internet. Businesses of all sizes use the software to accept payments and manage their businesses online.",
    website: "http://stripe.com",
    industry: "Financial Services",
    companySize: "2,500 employees",
    headquarters: "San Francisco, California, United States",
    subCategory: "Online Payment Processing"
  },
  {
    company: "Xero",
    logo: "logos:xero",
    title: "Xero Accounting Software",
    description: "Xero Accounting Software is a cloud-based solution that helps businesses manage their finances. It includes features for invoicing, bank reconciliation, and financial reporting.",
    tags: [
      "Accounting",
      "Financial Reporting",
      "Invoicing"
    ],
    category: "Commerce",
    costRange: "20k ~ 40k",
    averageCost: 25e3,
    team: [
      {
        tooltip: "Mona Stevens",
        src: "/img/avatars/6.svg"
      },
      {
        tooltip: "Neil Watson",
        src: "/img/avatars/1.svg"
      }
    ],
    location: "Wellington, New Zealand",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 135,
    reviews: [
      {
        username: "Paul Smith",
        position: "Accountant",
        src: "/img/avatars/29.svg",
        location: "Wellington, New Zealand",
        industry: "Finance",
        status: "manager",
        review: "Great for managing finances.",
        rating: 5
      },
      {
        username: "Quincy Jones",
        position: "Financial Analyst",
        src: "/img/avatars/30.svg",
        location: "Auckland, New Zealand",
        industry: "Accounting",
        status: "user",
        review: "Excellent financial reporting tools.",
        rating: 4
      }
    ],
    overview: "Xero is a cloud-based accounting software platform for small- and medium-sized businesses.",
    website: "http://xero.com",
    industry: "Accounting Software",
    companySize: "2,642 employees",
    headquarters: "Wellington, New Zealand",
    subCategory: "Financial Software"
  },
  {
    company: "Zapier",
    logo: "logos:zapier",
    title: "Zapier Automation",
    description: "Zapier Automation allows users to connect apps and automate workflows. It supports thousands of apps, enabling users to create custom automations that save time and increase productivity.",
    tags: [
      "Automation",
      "Workflows",
      "Integration"
    ],
    category: "IT",
    costRange: "10k ~ 20k",
    averageCost: 15e3,
    team: [
      {
        tooltip: "Olivia Martinez",
        src: "/img/avatars/10.svg"
      },
      {
        tooltip: "Peter Brown",
        src: "/img/avatars/11.svg"
      }
    ],
    location: "San Francisco, CA",
    video: "https://www.youtube.com/watch?v=q19RtuCHt1Q&t",
    likes: 145,
    reviews: [
      {
        username: "Rachel Adams",
        position: "Automation Engineer",
        src: "/img/avatars/31.svg",
        location: "San Francisco, CA",
        industry: "Automation",
        status: "manager",
        review: "Saves us a lot of time.",
        rating: 5
      },
      {
        username: "Steve Rogers",
        position: "Productivity Specialist",
        src: "/img/avatars/32.svg",
        location: "New York, NY",
        industry: "Productivity",
        status: "user",
        review: "Great for integrating apps.",
        rating: 4
      }
    ],
    overview: "Zapier is a product that allows end users to integrate the web applications they use and automate workflows.",
    website: "http://zapier.com",
    industry: "Software",
    companySize: "500 employees",
    headquarters: "San Francisco, California, United States",
    subCategory: "Automation Tools"
  }
];

export { demosData as d };
//# sourceMappingURL=demos-Cj8BemVk.mjs.map
