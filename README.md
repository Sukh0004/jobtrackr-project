JobTrackr - Full-Stack Job Application Tracker

JobTrackr is a full-stack web application designed to help users manage and track their job applications efficiently. It includes features such as authentication, job CRUD operations, a dashboard with analytics, reminder email notifications, and clean UI/UX using Tailwind CSS.

///////////////////////////////////////////////////
Features

1.User Authentication: Secure login and registration using JWT.

2.Job Management: Add, edit, delete, and view job applications.

3.Dashboard: Visual analytics and recent activity log.

4.Reminders: Send custom email reminders about upcoming job deadlines.

5.Responsive UI: Built with Tailwind CSS for clean, responsive design.

6.Testing: Frontend and backend tests using Vitest and Jest.
///////////////////////////////////////////////////
Tech Stack

Frontend:

.React

.React Router

.Tailwind CSS

.Axios

.Vitest + React Testing Library

Backend:

.Node.js + Express

.MongoDB + Mongoose

.JWT for authentication

.Nodemailer for email reminders( advanced functionality )

.Jest + Supertest for backend testing
///////////////////////////////////////////////////

Installation
1. Clone the repository
   git clone https://github.com/Sukh0004 jobtrackr-project.git
   
//////////////////////////////////////////////////////////////////////   


Set up environment variable
PORT=4000
MONGO_URI=mongodb+srv://jobtrackrUser:nOor2004@cluster0.cupsha1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=0987654321poiuytrewq
EMAIL_USER=noorkainth222@gmail.com
EMAIL_PASS=ioyflgpxxzignxms
///////////////////////////////////////////////////////////////////////

Running the app
Backend:
cd backend
npm run dev

Frontend:
cd frontend
npm run dev

Testing:
cd backend
npm test

cd frontend
npx vitest run
///////////////////////////////////////////////////////////////////////
API Routes:
Method        Endpoint              description
POST         /api/auth/register     Register new user
POST         /api/auth/login        Login and get token
GET          /api/jobs              Fetch all user jobs
POST         /api/jobs              Create new job entry
PUT          /api/jobs/:id          Update job entry
DELETE       /api/jobs/:id          Delete job entry
POST         /api/reminders         Send reminder email

Deployement:
Frontend on vercel
backend on Render
///////////////////////////////////////////////////////////////////////

Future Improvements:
User profile and avatar support

Save job filters and preferences

More refined analytics (e.g., time to get hired)
./././././././././/././././././././././././/././/./././././././././././


Developed by:
Sukhpreet Singh
GitHub: @Sukh0004



