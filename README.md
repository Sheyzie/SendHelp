# Project Description: Tracking Application

## SendHelp: A Comprehensive Healthcare Provider Tracking Platform

Overview: SendHelp is a robust web application designed to streamline healthcare provider operations and improve emergency response efficiency. With its cutting-edge features and intuitive interface, SendHelp is built to address the critical challenges of patient care coordination, provider management, and real-time communication.

## Key Features:

### User Authentication and Role Management:

SendHelp ensures secure access with a sophisticated authentication system. Users are assigned roles—such as administrators, healthcare providers, or dispatchers—granting access only to the features relevant to their responsibilities. This hierarchical role management enhances data privacy, minimizes errors, and ensures smooth operations within the platform.

### GPS Tracking for Ambulance Routing:

The platform incorporates advanced GPS tracking technology to locate patients in real-time. This feature enables dispatchers to assign the nearest ambulance and provide optimized routes for quicker response times. By reducing delays, SendHelp significantly enhances patient outcomes during emergencies.

### Healthcare Provider Management:

SendHelp simplifies the management of healthcare providers by centralizing their information. Administrators can effortlessly add, update, or remove providers, ensuring accurate and up-to-date records. This feature also facilitates efficient resource allocation, helping hospitals and clinics maintain optimal staff availability.

### User-Friendly Interface:

Designed with simplicity in mind, SendHelp offers an intuitive interface that requires minimal training. Its streamlined navigation and clear visual cues allow users to perform tasks efficiently, whether it's locating a patient, managing provider details, or dispatching ambulances.

### Why Choose SendHelp?

SendHelp bridges the gap between patients, healthcare providers, and emergency responders. Its secure, efficient, and user-focused approach ensures that healthcare organizations can focus on what matters most—saving lives and delivering quality care.

With SendHelp, healthcare providers are equipped with a powerful tool to navigate the complexities of modern healthcare, ensuring faster response times and better coordination across teams.

## **Project Requirements:**

1. **Node.js and Express Setup:**

   - **Express Application:**
     - Set up an Express.js project structure.
     - Implement routing for different parts of the application (e.g., `/users`, `/providers`, `/post`, `/admin`).

2. **User Management and Authentication:**

   - **User Registration and Login:**

     - **Registration:** Allow users to create an account by providing their personal details and setting a password. Store passwords securely using hashing (e.g., bcrypt).
     - **Login:** Implement a login system that authenticates users using their email and password. Upon successful login, start a session for the user.
     - **Profile Management:** Allow logged-in users to view and update their profile information (excluding their email and password).

   - **Session Management:**
     - Use session cookies to manage user sessions.
     - Implement session-based authentication to protect routes that require login (e.g., make post, initiate tracking).
     - Provide a logout functionality that ends the user’s session.

3. **Core Features Implementation:**

   - **User Management:**

     - **Create:** Users can register and create an account.
     - **Read:** Display a list of users (admin level 1 and 2 only), with search and filter options.
     - **Update:** Users can update their profile information.
     - **Delete:** Implement a feature for users to delete their accounts.

   - **Provider Management:**

     - **Create:** Providers can register, but registration should be validated by admin.
     - **Read:** Display a list of providers with their services.
     - **Update:** Allow providers or admin(level 1 and 2 only) to update profile information.
     - **Delete:** Implement a feature to deactivate(admin level 1 and 2 only) or delete provider profiles (both providers and admin level 1 and 2).

   - **Post and Tracking:**

     - **Create:** Users can initiate tracking by posting a real time picture confirming emergency is required.
     - **Read:** Display a list of posts for users and providers. Admin can view all post and trackings.
     - **Update:** Allow admin to be able cancel post from view.
     - **Delete:** Allow admin to cancel post, updating the status to "canceled."

   - **Admin Management:**

   - **Create:** Admin level 1 can register and assign access level to admin.
   - **Read:** Admin level 1 can view all admin
   - **Update:** Admin can update their profile
   - **Delete:** Admin level 1 can disable or delete an admin.

   - **Admin action**

   - **Create:** Record every administrative action.
   - **Read:** Admin can view their actions. Admin level 1 can view all actions.

4. **Interactivity and User Experience:**
   - Provide real-time feedback for form submissions (e.g., success messages, error handling).
