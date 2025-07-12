# 🎓 Teacher Dashboard - Teacher Management System

A comprehensive dashboard application built for teachers to manage their teaching activities, student interactions, schedules, and analytics. This modern web application provides an intuitive interface for tracking qualifications, availability, payments, and student progress.

## ✨ Features

- **Interactive Dashboard** - Real-time overview of teaching activities and statistics
- **Schedule Management** - Daily lesson planning and time slot management
- **Student Analytics** - Comprehensive insights into student engagement and progress
- **Payment Processing** - Secure payment interface with validation
- **Qualification Tracking** - Management of private and group teaching qualifications
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - GSAP-powered animations for enhanced user experience

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Technology Stack

- **Framework:** Next.js 15.3.5 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP (@gsap/react 2.1.2)
- **Icons:** Heroicons 2.2.0
- **Build Tool:** Turbopack (dev) / Webpack (production)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Home page component
│   └── globals.css         # Global CSS styles
└── Components/
    ├── Analytics.tsx       # Main analytics dashboard
    ├── ContactInfo.tsx     # Teacher contact information
    ├── DashboardLayout.tsx # Main layout wrapper
    ├── Header.tsx          # Top navigation bar
    ├── PaymentInterface.tsx# Payment processing form
    ├── Qualifications.tsx  # Teaching qualifications management
    ├── ScheduleTable.tsx   # Daily schedule display
    ├── Sidebar.tsx         # Navigation sidebar
    ├── TeacherDetails.tsx  # Teacher profile information
    └── Analytics/
        ├── AvailabilityTab.tsx    # Availability analytics
        ├── CommentsTab.tsx        # Student comments view
        ├── HistoryTab.tsx         # Teaching history
        ├── ScheduleTab.tsx        # Schedule analytics
        ├── StudentsTab.tsx        # Student management
        └── UnavailabilityTab.tsx  # Unavailability tracking
```

## 🎯 Component Overview

### Core Components

#### 🏠 **DashboardLayout**
- **Purpose:** Main application wrapper that coordinates sidebar and content areas
- **Features:** Tab-based navigation, responsive layout, smooth page transitions
- **Animations:** Content fade transitions, initial mount animations

#### 📊 **Header**
- **Purpose:** Top navigation with search, notifications, and user profile
- **Features:** Search functionality, notification badge, user menu
- **Responsive:** Collapsible elements for mobile devices
- **Animations:** Entry animations, hover effects on interactive elements

#### 🎛️ **Sidebar**
- **Purpose:** Navigation menu with collapsible functionality
- **Features:** Tab switching, expandable/collapsible design
- **Animations:** Smooth expand/collapse, staggered menu item entries
- **Mobile:** Touch-friendly with proper spacing

#### 👨‍🏫 **TeacherDetails**
- **Purpose:** Teacher profile display with statistics and ratings
- **Features:** Star ratings, student count, experience display
- **Data:** Teacher information, performance metrics
- **Animations:** Scale-in effects, star rating animations, stat card hover effects

### Management Components

#### 📚 **Qualifications**
- **Purpose:** Management of teaching qualifications and revenue tracking
- **Features:** 
  - Private lesson qualifications (Subject areas like Contemporary, Core, Mix, Plus, Instrument)
  - Group class management (Class Direction, Theory Groups)
  - Revenue calculations and display
- **Data:** Qualification types, rates ($28/hr private, $35-45/session group), student counts
- **Animations:** Qualification item animations, revenue card effects

#### 📅 **ScheduleTable**
- **Purpose:** Daily lesson schedule with status tracking
- **Features:**
  - Time slot management (8:00 AM - 7:00 PM)
  - Lesson types (online/offline)
  - Status tracking (upcoming, completed, cancelled)
  - Quick action buttons
- **Statistics:** Daily lesson counts, completion rates
- **Animations:** Schedule item staggered entries, status indicator animations

#### 💳 **PaymentInterface**
- **Purpose:** Secure payment processing with real-time validation
- **Features:**
  - Card number formatting (automatic spacing)
  - Expiry date validation (MM/YY format)
  - CVV security validation
  - Multiple payment methods
- **Security:** Input sanitization, format validation
- **UX:** Real-time feedback, loading states, success/error animations

#### 📞 **ContactInfo**
- **Purpose:** Teacher contact information display
- **Features:**
  - Work email with verification status
  - Primary phone number
  - Home address with map integration
  - Emergency contact details
  - Portfolio website link
- **Layout:** Responsive card grid, gradient backgrounds
- **Animations:** Contact card animations, hover interactions

### Analytics Components

#### 📈 **Analytics**
- **Purpose:** Main analytics dashboard with tabbed interface
- **Tabs:**
  - **Schedule:** Weekly schedule overview and patterns
  - **Students:** Student engagement and progress metrics
  - **Availability:** Time slot availability analysis
  - **Unavailability:** Blocked time tracking with reasons
  - **Comments:** Student feedback and communication
  - **History:** Teaching activity history and trends
- **Features:** Interactive tabs, data visualization, filtering options
- **Animations:** Tab transitions, content loading effects

#### 📊 **AvailabilityTab**
- **Purpose:** Visualize teacher availability patterns
- **Features:**
  - Weekly availability grid (Monday-Sunday, 8 AM-7 PM)
  - Monthly trend analysis
  - Availability statistics (available/total slots)
  - Visual availability indicators
- **Data:** Time slot availability, monthly percentages, trend analysis

#### ❌ **UnavailabilityTab**
- **Purpose:** Track and manage unavailable time slots
- **Features:**
  - Reason categorization (appointments, meetings, breaks, training)
  - Weekly unavailability patterns
  - Time slot conflict detection
- **Management:** Easy addition/removal of unavailable slots

#### 👥 **StudentsTab**
- **Purpose:** Student management and engagement tracking
- **Features:** Student roster, progress tracking, communication logs

#### 💬 **CommentsTab**
- **Purpose:** Student feedback and communication history
- **Features:** Comment threading, response management, sentiment tracking

#### 📚 **HistoryTab**
- **Purpose:** Historical teaching data and performance trends
- **Features:** Activity logs, performance metrics, trend analysis

#### 🗓️ **ScheduleTab**
- **Purpose:** Schedule analytics and optimization insights
- **Features:** Schedule efficiency metrics, time utilization analysis

## 🎨 Design Features

### Animations (GSAP)
- **Smooth Transitions:** Page changes, tab switches, content loading
- **Hover Effects:** Scale animations, color transitions, shadow effects
- **Entry Animations:** Staggered item appearances, fade-ins, scale effects
- **Interactive Feedback:** Button presses, form interactions, loading states

### Responsive Design
- **Mobile-First:** Optimized for mobile devices with progressive enhancement
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts:** Grid systems that adapt to screen size
- **Touch-Friendly:** Proper spacing and sizing for touch interactions

### Visual Design
- **Color Scheme:** Professional gradients with blue, indigo, emerald, and purple themes
- **Typography:** Clear hierarchy with responsive font sizing
- **Cards:** Elevated cards with subtle shadows and hover effects
- **Icons:** Heroicons for consistent visual language

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build production version
npm run start        # Start production server
npm run lint         # Run ESLint for code quality

# Development with Turbopack (faster)
npm run dev --turbo  # Development with Turbopack bundler
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This project follows modern React/Next.js best practices:

1. **Code Style:** TypeScript with strict typing
2. **Components:** Functional components with hooks
3. **State Management:** React useState and useEffect
4. **Styling:** Tailwind CSS utility classes
5. **Animations:** GSAP for smooth interactions

## 📄 License

This project is developed as part of Pearl Thoughts assignment.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
