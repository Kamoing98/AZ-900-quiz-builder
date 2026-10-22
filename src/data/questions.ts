export interface Question {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reference?: string;
}

export const topics = [
  { id: 'cloud-concepts', name: 'Cloud Concepts', icon: '☁️', description: 'Cloud computing principles, types, and models' },
  { id: 'core-azure-services', name: 'Core Azure Services', icon: '🔧', description: 'Compute, networking, storage, and database services' },
  { id: 'security', name: 'Security', icon: '🔒', description: 'Network security, identity, and data protection' },
  { id: 'governance', name: 'Governance & Compliance', icon: '📋', description: 'Policies, RBAC, tags, and compliance' },
  { id: 'pricing', name: 'Pricing & Support', icon: '💰', description: 'Cost management, SLAs, and support plans' },
];

export const questions: Question[] = [
  // Cloud Concepts
  {
    id: 'cc-1',
    topic: 'cloud-concepts',
    difficulty: 'easy',
    question: 'What is cloud computing?',
    options: [
      'A type of weather prediction system',
      'The delivery of computing services over the internet',
      'A local server storage solution',
      'A programming language'
    ],
    correctAnswer: 1,
    explanation: 'Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.',
    reference: 'https://learn.microsoft.com/en-us/azure/fundamentals/cloud-computing'
  },
  {
    id: 'cc-2',
    topic: 'cloud-concepts',
    difficulty: 'easy',
    question: 'Which cloud model provides the most control over infrastructure?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Multi-cloud'
    ],
    correctAnswer: 1,
    explanation: 'A private cloud gives you the most control over your infrastructure. It is dedicated to a single organization and can be hosted on-premises or by a third party. You have full control over hardware, security, and configuration.',
  },
  {
    id: 'cc-3',
    topic: 'cloud-concepts',
    difficulty: 'medium',
    question: 'What are the three main types of cloud service models?',
    options: [
      'IaaS, PaaS, SaaS',
      'DNS, HTTP, FTP',
      'VM, Container, Serverless',
      'Public, Private, Hybrid'
    ],
    correctAnswer: 0,
    explanation: 'The three main cloud service models are: IaaS (Infrastructure as a Service) - provides virtualized computing resources; PaaS (Platform as a Service) - provides a platform for developing applications; SaaS (Software as a Service) - provides software applications over the internet.',
  },
  {
    id: 'cc-4',
    topic: 'cloud-concepts',
    difficulty: 'medium',
    question: 'What is the benefit of economies of scale in cloud computing?',
    options: [
      'You can only use small-scale resources',
      'Cloud providers can offer lower prices due to large-scale operations',
      'You must use all resources at the same time',
      'Resources are limited to one region'
    ],
    correctAnswer: 1,
    explanation: 'Economies of scale refer to the cost advantages that cloud providers gain due to their size. By operating at massive scale, they can pass savings to customers through lower per-unit costs for computing, storage, and other resources.',
  },
  {
    id: 'cc-5',
    topic: 'cloud-concepts',
    difficulty: 'easy',
    question: 'What is the difference between CapEx and OpEx?',
    options: [
      'CapEx is monthly, OpEx is yearly',
      'CapEx is upfront investment, OpEx is pay-as-you-go',
      'CapEx is for software, OpEx is for hardware',
      'There is no difference'
    ],
    correctAnswer: 1,
    explanation: 'CapEx (Capital Expenditure) is money spent upfront on infrastructure, while OpEx (Operational Expenditure) is money spent on services or products over time. Cloud computing typically shifts costs from CapEx to OpEx, as you pay for what you use.',
  },
  {
    id: 'cc-6',
    topic: 'cloud-concepts',
    difficulty: 'hard',
    question: 'Which cloud deployment model combines both public and private clouds?',
    options: [
      'Multi-cloud',
      'Community cloud',
      'Hybrid cloud',
      'Distributed cloud'
    ],
    correctAnswer: 2,
    explanation: 'A hybrid cloud combines public and private clouds, allowing organizations to run workloads in the most appropriate environment. It provides flexibility to move workloads between cloud solutions as needs and costs change.',
  },
  {
    id: 'cc-7',
    topic: 'cloud-concepts',
    difficulty: 'medium',
    question: 'What does "high availability" mean in cloud computing?',
    options: [
      'Services are always free',
      'Services have a high uptime guarantee',
      'Services are available in only one region',
      'Services require manual intervention'
    ],
    correctAnswer: 1,
    explanation: 'High availability refers to the ability of a system to remain operational for an extended period, even if components fail. Cloud providers design their services with redundancy to ensure high availability, often measured in "nines" (e.g., 99.99%).',
  },
  {
    id: 'cc-8',
    topic: 'cloud-concepts',
    difficulty: 'medium',
    question: 'What is scalability in cloud computing?',
    options: [
      'The ability to increase or decrease resources as needed',
      'The ability to only increase resources',
      'The ability to decrease costs only',
      'The ability to use only one type of resource'
    ],
    correctAnswer: 0,
    explanation: 'Scalability is the ability to increase or decrease resources as needed to match demand. In the cloud, you can scale up (more powerful resources) or scale out (more instances), and scale down or in when demand decreases.',
  },
  // Core Azure Services
  {
    id: 'cas-1',
    topic: 'core-azure-services',
    difficulty: 'easy',
    question: 'What is an Azure Virtual Machine?',
    options: [
      'A physical server in your datacenter',
      'An on-demand, scalable computing resource in Azure',
      'A storage device',
      'A networking cable'
    ],
    correctAnswer: 1,
    explanation: 'Azure Virtual Machines (VMs) are on-demand, scalable computing resources provided by Azure. They let you create and use virtual machines in the cloud, giving you the flexibility of virtualization without buying and maintaining physical hardware.',
  },
  {
    id: 'cas-2',
    topic: 'core-azure-services',
    difficulty: 'medium',
    question: 'Which Azure service is used for serverless computing?',
    options: [
      'Azure Virtual Machines',
      'Azure Functions',
      'Azure Storage',
      'Azure Virtual Network'
    ],
    correctAnswer: 1,
    explanation: 'Azure Functions is a serverless compute service that lets you run event-triggered code without having to explicitly provision or manage infrastructure. You only pay for the time your code runs.',
  },
  {
    id: 'cas-3',
    topic: 'core-azure-services',
    difficulty: 'easy',
    question: 'What is Azure Blob Storage used for?',
    options: [
      'Running virtual machines',
      'Storing unstructured data like documents and images',
      'Managing user identities',
      'Creating virtual networks'
    ],
    correctAnswer: 1,
    explanation: 'Azure Blob Storage is designed for storing massive amounts of unstructured data, such as text or binary data. This includes documents, images, videos, backups, and big data analytics.',
  },
  {
    id: 'cas-4',
    topic: 'core-azure-services',
    difficulty: 'medium',
    question: 'Which Azure service provides a managed relational database?',
    options: [
      'Azure Cosmos DB',
      'Azure SQL Database',
      'Azure Blob Storage',
      'Azure Table Storage'
    ],
    correctAnswer: 1,
    explanation: 'Azure SQL Database is a fully managed relational database service based on the latest stable version of Microsoft SQL Server. It provides built-in intelligence, security, and automatic scaling.',
  },
  {
    id: 'cas-5',
    topic: 'core-azure-services',
    difficulty: 'hard',
    question: 'What is the difference between Azure Load Balancer and Azure Traffic Manager?',
    options: [
      'They are the same service',
      'Load Balancer works at DNS level, Traffic Manager at IP level',
      'Load Balancer distributes within a region, Traffic Manager distributes across regions',
      'Load Balancer is for VMs only, Traffic Manager is for databases'
    ],
    correctAnswer: 2,
    explanation: 'Azure Load Balancer distributes traffic within the same region (regional service) at the network level (Layer 4). Azure Traffic Manager is a DNS-based traffic load balancer that distributes traffic across different regions globally.',
  },
  {
    id: 'cas-6',
    topic: 'core-azure-services',
    difficulty: 'medium',
    question: 'What is Azure Kubernetes Service (AKS)?',
    options: [
      'A virtual machine service',
      'A managed Kubernetes container orchestration service',
      'A database service',
      'A storage service'
    ],
    correctAnswer: 1,
    explanation: 'Azure Kubernetes Service (AKS) is a managed container orchestration service based on Kubernetes. It simplifies deploying, managing, and scaling containerized applications using Kubernetes.',
  },
  {
    id: 'cas-7',
    topic: 'core-azure-services',
    difficulty: 'easy',
    question: 'What is Azure Virtual Network (VNet)?',
    options: [
      'A social network for Azure users',
      'A fundamental building block for private networks in Azure',
      'A type of storage',
      'A monitoring tool'
    ],
    correctAnswer: 1,
    explanation: 'Azure Virtual Network (VNet) is the fundamental building block for your private network in Azure. It enables many types of Azure resources to securely communicate with each other, the internet, and on-premises networks.',
  },
  {
    id: 'cas-8',
    topic: 'core-azure-services',
    difficulty: 'medium',
    question: 'Which Azure service is used for content delivery?',
    options: [
      'Azure CDN',
      'Azure Functions',
      'Azure SQL Database',
      'Azure Logic Apps'
    ],
    correctAnswer: 0,
    explanation: 'Azure Content Delivery Network (CDN) reduces load times for websites and apps by caching content at strategically placed locations around the world, providing the best user experience by using edge locations closest to users.',
  },
  // Security
  {
    id: 'sec-1',
    topic: 'security',
    difficulty: 'easy',
    question: 'What is Azure Active Directory (Azure AD)?',
    options: [
      'A directory for file storage',
      'Microsoft\'s cloud-based identity and access management service',
      'A database service',
      'A networking service'
    ],
    correctAnswer: 1,
    explanation: 'Azure Active Directory (now Microsoft Entra ID) is Microsoft\'s cloud-based identity and access management service. It provides single sign-on, multi-factor authentication, and conditional access to protect against identity attacks.',
  },
  {
    id: 'sec-2',
    topic: 'security',
    difficulty: 'medium',
    question: 'What is Multi-Factor Authentication (MFA)?',
    options: [
      'Using multiple passwords',
      'Requiring two or more verification methods to sign in',
      'Having multiple user accounts',
      'Using multiple browsers'
    ],
    correctAnswer: 1,
    explanation: 'Multi-Factor Authentication (MFA) helps protect user accounts by requiring two or more verification methods: something you know (password), something you have (phone), or something you are (biometrics).',
  },
  {
    id: 'sec-3',
    topic: 'security',
    difficulty: 'medium',
    question: 'What is a Network Security Group (NSG)?',
    options: [
      'A group of network administrators',
      'A list of security rules that control network traffic',
      'A type of virtual machine',
      'A storage account'
    ],
    correctAnswer: 1,
    explanation: 'A Network Security Group (NSG) contains a list of security rules that control inbound and outbound network traffic to and from Azure resources. Each rule specifies source, destination, port, protocol, and action (allow or deny).',
  },
  {
    id: 'sec-4',
    topic: 'security',
    difficulty: 'hard',
    question: 'What is Azure Key Vault used for?',
    options: [
      'Storing virtual machine images',
      'Safeguarding cryptographic keys and secrets',
      'Managing network traffic',
      'Hosting websites'
    ],
    correctAnswer: 1,
    explanation: 'Azure Key Vault is a cloud service for securely storing and accessing secrets (API keys, passwords, certificates) and cryptographic keys. It helps safeguard cryptographic keys and secrets used by applications and services.',
  },
  {
    id: 'sec-5',
    topic: 'security',
    difficulty: 'easy',
    question: 'What is Role-Based Access Control (RBAC)?',
    options: [
      'A way to control physical access to datacenters',
      'A system that manages who has access to Azure resources and what they can do',
      'A backup solution',
      'A monitoring tool'
    ],
    correctAnswer: 1,
    explanation: 'Role-Based Access Control (RBAC) helps you manage who has access to Azure resources, what they can do with those resources, and what areas they have access to. It uses roles that contain sets of permissions.',
  },
  {
    id: 'sec-6',
    topic: 'security',
    difficulty: 'medium',
    question: 'What is Azure Security Center (now Microsoft Defender for Cloud)?',
    options: [
      'A physical security system for datacenters',
      'A unified infrastructure security management system',
      'A firewall service',
      'A VPN service'
    ],
    correctAnswer: 1,
    explanation: 'Microsoft Defender for Cloud (formerly Azure Security Center) is a unified infrastructure security management system that strengthens the security posture of your data centers and provides advanced threat protection across hybrid workloads.',
  },
  {
    id: 'sec-7',
    topic: 'security',
    difficulty: 'hard',
    question: 'What is the shared responsibility model in Azure security?',
    options: [
      'Microsoft is responsible for all security',
      'The customer is responsible for all security',
      'Security responsibilities are shared between Microsoft and the customer depending on the service model',
      'Security is not a concern in the cloud'
    ],
    correctAnswer: 2,
    explanation: 'The shared responsibility model defines the division of security responsibilities between the cloud provider (Microsoft) and the customer. For IaaS, the customer has more responsibility; for SaaS, Microsoft handles more. Both are always responsible for data, endpoints, accounts, and identities.',
  },
  {
    id: 'sec-8',
    topic: 'security',
    difficulty: 'medium',
    question: 'What is Azure DDoS Protection?',
    options: [
      'A tool for testing network speed',
      'A service that protects against distributed denial-of-service attacks',
      'A database optimization tool',
      'A file compression service'
    ],
    correctAnswer: 1,
    explanation: 'Azure DDoS Protection helps protect Azure applications from distributed denial-of-service (DDoS) attacks. It provides always-on monitoring and real-time mitigation against common network-level attacks.',
  },
  // Governance & Compliance
  {
    id: 'gov-1',
    topic: 'governance',
    difficulty: 'easy',
    question: 'What are Azure Resource Groups?',
    options: [
      'A group of users',
      'Logical containers that hold related Azure resources',
      'A type of virtual machine',
      'A billing plan'
    ],
    correctAnswer: 1,
    explanation: 'Resource groups are logical containers in Azure where you deploy and manage resources like VMs, web apps, databases, and storage accounts. They help organize resources by project, environment, or team.',
  },
  {
    id: 'gov-2',
    topic: 'governance',
    difficulty: 'medium',
    question: 'What is Azure Policy?',
    options: [
      'A law enforcement tool',
      'A service that creates, assigns, and manages policies to enforce organizational standards',
      'A pricing calculator',
      'A monitoring dashboard'
    ],
    correctAnswer: 1,
    explanation: 'Azure Policy creates, assigns, and manages policies to enforce rules and effects over your resources. It helps keep resources compliant with corporate standards and service level agreements.',
  },
  {
    id: 'gov-3',
    topic: 'governance',
    difficulty: 'medium',
    question: 'What are Azure Management Groups?',
    options: [
      'A group of IT managers',
      'Containers that help manage access, policy, and compliance across multiple subscriptions',
      'A type of resource group',
      'A billing feature'
    ],
    correctAnswer: 1,
    explanation: 'Azure Management Groups provide a level of scope above subscriptions. They allow you to organize subscriptions into containers and apply governance policies and control access across multiple subscriptions.',
  },
  {
    id: 'gov-4',
    topic: 'governance',
    difficulty: 'easy',
    question: 'What are Azure Tags?',
    options: [
      'Social media tags',
      'Name-value pairs that help categorize and organize resources',
      'Security labels',
      'Pricing tiers'
    ],
    correctAnswer: 1,
    explanation: 'Tags are name-value pairs that help you categorize resources and view consolidated billing by applying the same tag to multiple resources. They help organize resources for management, cost tracking, and automation.',
  },
  {
    id: 'gov-5',
    topic: 'governance',
    difficulty: 'hard',
    question: 'What is Azure Blueprints?',
    options: [
      'A design tool for creating websites',
      'A service that enables cloud architects to define a repeatable set of Azure resources',
      'A monitoring service',
      'A backup solution'
    ],
    correctAnswer: 1,
    explanation: 'Azure Blueprints enables cloud architects to define a repeatable set of Azure resources that implements and adheres to an organization\'s standards, patterns, and requirements. It orchestrates the deployment of resource templates and other artifacts.',
  },
  {
    id: 'gov-6',
    topic: 'governance',
    difficulty: 'medium',
    question: 'What is Azure Locks used for?',
    options: [
      'Encrypting data',
      'Preventing accidental deletion or modification of resources',
      'Locking user accounts',
      'Securing network access'
    ],
    correctAnswer: 1,
    explanation: 'Azure Locks prevent accidental deletion or modification of resources. You can apply CanNotDelete or ReadOnly locks to subscriptions, resource groups, or individual resources to protect critical infrastructure.',
  },
  // Pricing & Support
  {
    id: 'pr-1',
    topic: 'pricing',
    difficulty: 'easy',
    question: 'What is the Azure Pricing Calculator?',
    options: [
      'A tool for solving math problems',
      'A tool to estimate the cost of Azure services',
      'A billing payment method',
      'A resource monitoring tool'
    ],
    correctAnswer: 1,
    explanation: 'The Azure Pricing Calculator helps you estimate the cost of Azure services before you deploy them. You can configure services and see estimated monthly costs based on your expected usage.',
  },
  {
    id: 'pr-2',
    topic: 'pricing',
    difficulty: 'medium',
    question: 'What is an Azure Service Level Agreement (SLA)?',
    options: [
      'A legal contract for buying hardware',
      'A formal agreement between Microsoft and customers about service availability',
      'A pricing discount',
      'A support ticket system'
    ],
    correctAnswer: 1,
    explanation: 'An SLA is a formal agreement between Microsoft and customers that guarantees a specific level of availability (uptime). If the service doesn\'t meet the SLA, customers may be eligible for service credits.',
  },
  {
    id: 'pr-3',
    topic: 'pricing',
    difficulty: 'medium',
    question: 'What are Azure Reserved Instances?',
    options: [
      'VMs that are always running',
      'A discount for committing to 1 or 3-year terms for resources',
      'Backup storage',
      'Free tier resources'
    ],
    correctAnswer: 1,
    explanation: 'Azure Reserved Instances provide significant cost savings (up to 72%) compared to pay-as-you-go prices when you commit to a 1-year or 3-year term for virtual machines, SQL databases, Cosmos DB, and other resources.',
  },
  {
    id: 'pr-4',
    topic: 'pricing',
    difficulty: 'easy',
    question: 'What is the Azure Free Account?',
    options: [
      'A free trial with $200 credit and free services for 12 months',
      'A permanently free unlimited account',
      'A student-only account',
      'A trial that lasts 7 days'
    ],
    correctAnswer: 0,
    explanation: 'The Azure Free Account provides $200 in credit for the first 30 days, plus 12 months of popular free services and 25+ always-free services. It\'s designed to help you explore Azure.',
  },
  {
    id: 'pr-5',
    topic: 'pricing',
    difficulty: 'hard',
    question: 'What is the difference between Azure Advisor and Azure Cost Management?',
    options: [
      'They are the same service',
      'Advisor provides recommendations, Cost Management provides cost analysis and budgets',
      'Advisor is for security, Cost Management is for pricing',
      'Advisor is free, Cost Management costs extra'
    ],
    correctAnswer: 1,
    explanation: 'Azure Advisor provides personalized recommendations for cost optimization, security, reliability, and operational excellence. Azure Cost Management helps analyze, manage, and optimize cloud spending with tools like budgets, cost analysis, and alerts.',
  },
  {
    id: 'pr-6',
    topic: 'pricing',
    difficulty: 'medium',
    question: 'Which Azure support plan provides 24/7 phone support and a dedicated support manager?',
    options: [
      'Basic',
      'Developer',
      'Standard',
      'Professional Direct'
    ],
    correctAnswer: 3,
    explanation: 'The Professional Direct support plan provides 24/7 phone support, a dedicated support manager, faster response times for critical cases, and proactive guidance. It\'s the most comprehensive support plan available.',
  },
  {
    id: 'pr-7',
    topic: 'pricing',
    difficulty: 'medium',
    question: 'What is Azure Spot VM pricing?',
    options: [
      'A premium pricing tier for guaranteed availability',
      'Discounted pricing for VMs that can be evicted when capacity is needed',
      'Free VMs for testing',
      'Pricing for GPU-enabled VMs'
    ],
    correctAnswer: 1,
    explanation: 'Azure Spot VMs offer up to 90% cost savings by using excess Azure capacity. However, these VMs can be evicted at any time when Azure needs the capacity back, making them ideal for fault-tolerant workloads.',
  },
  {
    id: 'pr-8',
    topic: 'pricing',
    difficulty: 'easy',
    question: 'What factors affect Azure pricing?',
    options: [
      'Only the number of VMs',
      'Resource type, region, instance size, and usage duration',
      'Only the storage used',
      'Only the network bandwidth'
    ],
    correctAnswer: 1,
    explanation: 'Azure pricing depends on multiple factors including the type of resource, the Azure region where it\'s deployed, the instance size/SKU, and how long it\'s used. Understanding these factors helps optimize costs.',
  },
];

export const getQuestionsByTopic = (topicId: string): Question[] => {
  return questions.filter(q => q.topic === topicId);
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
