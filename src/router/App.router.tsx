import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ClientsPage, HomePage, LoginPage } from '../pages';
import {
  ActiveCampaign,
  ClientAffliatePortalPage,
  CloudMail,
  InvoiceOptionsPage,
  MyCompanyPage,
  MyCompanyProfilePage,
  MyLogoPage,
  MyTeamMembersPage
} from '../pages/MyCompanyPage';
import { DisputeOptionPage } from '../pages/MyCompanyPage/pages/DisputeOption';
import {
  DayView,
  MonthView,
  SchedulePage,
  TaskEventPage,
  WeekView
} from '../pages/SchedulePage';
import { routes } from '../utils';
import { ClientAffliateDetails } from '../features/client-affliate-details';
import { ClientAffliateResources } from '../features/client-affliate-resources';
import { ClientAffliateCreditInfo } from '../features/client-affliate-credit-info';
import { InvoicesPage } from '../pages/Invoices/Invoices.page';

// Route Object Configuration

export const AppRoutes: RouteObject[] = [
  // Default Route navigation to login page
  {
    path: routes.DEFAUT,
    element: <Navigate to={routes.UNAUTHENTICATED} replace />
  },
  // login page route /auth/login
  {
    path: routes.AUTH,
    children: [
      {
        path: routes.LOGIN,
        element: <LoginPage />
      }
    ]
  },
  {
    path: routes.APP,
    element: <MainLayout />,
    children: [
      {
        path: routes.HOME,
        element: <HomePage />
      },
      {
        path: routes.CLIENTS,
        element: <ClientsPage />
      },
      {
        path: routes.SCHEDULE,
        element: <SchedulePage />,
        children: [
          {
            index: true,
            element: <WeekView />
          },
          {
            path: routes.DAY,
            element: <DayView />
          },
          {
            path: routes.MONTH,
            element: (
              <>
                <MonthView />
              </>
            )
          },
          {
            path: routes.TASKS_AND_EVENTS,
            element: (
              <>
                <TaskEventPage />
              </>
            )
          }
        ]
      },
      {
        path: routes.MY_COMPANY,
        element: <MyCompanyPage />,
        children: [
          {
            index: true,
            element: <MyCompanyProfilePage />
          },
          {
            path: routes.MY_COMPANY_TEAM,
            element: <MyTeamMembersPage />
          },
          {
            path: routes.MY_COMPANY_ROLES,
            element: <div>My Company Settings</div>
          },
          {
            path: routes.MY_COMPANY_CMS,
            element: <div>My Company CMS</div>
          },
          {
            path: routes.MY_COMPANY_CLOUD_MAIL,
            element: <CloudMail />
          },
          {
            path: routes.MY_COMPANY_CLIENT_AFFLIATE,
            element: <ClientAffliatePortalPage />,
            children: [
              {
                index: true,
                element: <MyLogoPage />
              },
              {
                path: routes.MY_COMPANY_CAF_DETAILS,
                element: <ClientAffliateDetails />
              },
              {
                path: routes.MY_COMPANY_CAF_RESOURCES,
                element: <ClientAffliateResources />
              },
              {
                path: routes.MY_COMPANY_CAF_CLIENT_INFO,
                element: <ClientAffliateCreditInfo />
              },
              {
                path: routes.MY_COMPANY_CAF_CLIENTS_CHOICE,
                element: <></>
              },
              {
                path: routes.MY_COMPANY_CAF_PORTAL_THEME,
                element: <></>
              },
              {
                path: routes.MY_COMPANY_CAF_COAT,
                element: <></>
              }
            ]
          },
          {
            path: routes.MY_COMPANY_WEBSITE_TOOLS,
            element: <div>My Company Website Tools</div>
          },
          {
            path: routes.MY_COMPANY_CREDIT_AUDIT,
            element: <div>My Company Credit Audit</div>
          },
          {
            path: routes.MY_COMPANY_CLIENT_AGREEMENT,
            element: <div>My Company Client Agreement</div>
          },
          {
            path: routes.MY_COMPANY_DIGITAL_SIGNATURE,
            element: <div>My Company Digital Signature</div>
          },
          {
            path: routes.MY_COMPANY_DISPUTE,
            element: <DisputeOptionPage />
          },
          {
            path: routes.MY_COMPANY_AUTOMATED_NOTIFICATIONS,
            element: <div>My Company Automated Notifications</div>
          },
          {
            path: routes.MY_COMPANY_CLIENT_STATUS,
            element: <div>My Company Settings</div>
          },
          {
            path: routes.MY_COMPANY_INVOICE_OPTIONS,
            element: <InvoiceOptionsPage />
          },
          {
            path: routes.MY_COMPANY_AFFLIATE_PAYMENTS,
            element: <div>My Company Affliate Payments</div>
          },
          {
            path: routes.MY_COMPANY_ACTIVE_CAMPAIGNS,
            element: <ActiveCampaign />
          },
          {
            path: routes.MY_COMPANY_RECURRING_PAYMENTS,
            element: <div>My Company Recurring Payments</div>
          },
          {
            path: routes.MY_COMPANY_API_AUTOMATION,
            element: <div>My Company API Automation</div>
          }
        ]
      },
      {
        path: routes.INVOICES,
        element: <InvoicesPage />
      }
    ]
  }
];
