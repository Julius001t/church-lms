import { createBrowserRouter } from "react-router-dom";

// =====================================================
// LAYOUTS
// =====================================================

import WebsiteLayout from "@/components/layout/WebsiteLayout";
import AppLayout from "@/components/layout/AppLayout";
import LearningLayout from "@/components/layout/LearningLayout";

// =====================================================
// PUBLIC WEBSITE
// =====================================================

import HomePage from "@/features/home/pages/HomePage";

// =====================================================
// AUTHENTICATION
// =====================================================

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";

// =====================================================
// COURSES
// =====================================================

import CoursesPage from "@/features/courses/pages/CoursesPage";
import CourseDetailPage from "@/features/courses/pages/CourseDetailPage";

// =====================================================
// DASHBOARD
// =====================================================

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// =====================================================
// ENROLLMENTS
// =====================================================

import EnrollmentsPage from "@/features/enrollments/pages/EnrollmentsPage";

// =====================================================
// LEARNING
// =====================================================

import LearningPage from "@/features/learning/pages/LearningPage";

// =====================================================
// EXAMS
// =====================================================

import ExamsPage from "@/features/exams/pages/ExamsPage";
import TakeExamPage from "@/features/exams/pages/TakeExamPage";
import ExamSubmittedPage from "@/features/exams/pages/ExamSubmittedPage";
import ExamReviewPage from "@/features/exams/pages/ExamReviewPage";
import StudentResultPage from "@/features/exams/pages/StudentResultPage";
import AdminExamAttemptsPage from "@/features/exams/pages/AdminExamAttemptsPage";

// =====================================================
// PROFILE
// =====================================================

import ProfilePage from "@/features/profile/pages/ProfilePage";

// =====================================================
// CERTIFICATES
// =====================================================

import CertificatesPage from "@/features/certificates/pages/CertificatesPage";

// =====================================================
// NOTIFICATIONS
// =====================================================

import NotificationsPage from "@/features/notifications/pages/NotificationsPage";

// =====================================================
// ERROR PAGES
// =====================================================

import NotFoundPage from "@/features/errors/pages/NotFoundPage";

// =====================================================
// ROUTE GUARDS
// =====================================================

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// =====================================================
// ROUTER
// =====================================================

export const router = createBrowserRouter([
  // =====================================================
  // PUBLIC WEBSITE
  // =====================================================

  {
    element: <WebsiteLayout />,

    children: [
      // =================================================
      // HOME
      // =================================================

      {
        path: "/",
        element: <HomePage />,
      },

      // =================================================
      // PUBLIC AUTHENTICATION
      // =================================================

      {
        element: <PublicRoute />,

        children: [
          {
            path: "login",
            element: <LoginPage />,
          },

          {
            path: "register",
            element: <RegisterPage />,
          },

          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },

          {
            path: "reset-password/:uid/:token",
            element: <ResetPasswordPage />,
          },
        ],
      },

      // =================================================
      // PROTECTED COURSE PAGES
      // =================================================

      {
        element: <ProtectedRoute />,

        children: [
          {
            path: "courses",
            element: <CoursesPage />,
          },

          {
            path: "courses/:id",
            element: <CourseDetailPage />,
          },
        ],
      },
    ],
  },

  // =====================================================
  // PROTECTED APPLICATION
  // =====================================================

  {
    element: <ProtectedRoute />,

    children: [
      // =================================================
      // APPLICATION LAYOUT
      // =================================================

      {
        element: <AppLayout />,

        children: [
          // =============================================
          // DASHBOARD
          // =============================================

          {
            path: "dashboard",
            element: <DashboardPage />,
          },

          // =============================================
          // ENROLLMENTS
          // =============================================

          {
            path: "enrollments",
            element: <EnrollmentsPage />,
          },

          // =============================================
          // EXAMS
          // =============================================

          {
            path: "exams",
            element: <ExamsPage />,
          },

          {
            path: "exams/:id",
            element: <TakeExamPage />,
          },

          {
            path: "exams/submitted/:id",
            element: <ExamSubmittedPage />,
          },

          {
            path: "exams/results/:attemptId",
            element: <StudentResultPage />,
          },

          {
            path: "exams/review/:attemptId",
            element: <ExamReviewPage />,
          },

          // =============================================
          // PROFILE
          // =============================================

          {
            path: "profile",
            element: <ProfilePage />,
          },

          // =============================================
          // CERTIFICATES
          // =============================================

          {
            path: "certificates",
            element: <CertificatesPage />,
          },

          // =============================================
          // NOTIFICATIONS
          // =============================================

          {
            path: "notifications",
            element: <NotificationsPage />,
          },

          // =============================================
          // ADMIN
          // =============================================

          {
            path: "admin/exams/attempts",
            element: <AdminExamAttemptsPage />,
          },
        ],
      },

      // =================================================
      // LEARNING APPLICATION
      // =================================================

      {
        element: <LearningLayout />,

        children: [
          {
            path: "courses/:id/learn",
            element: <LearningPage />,
          },
        ],
      },
    ],
  },

  // =====================================================
  // 404 - PAGE NOT FOUND
  // =====================================================

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);