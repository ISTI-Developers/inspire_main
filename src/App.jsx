import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Clients from "./Pages/Clients";
import Programs from "./Pages/Programs";
import Experts from "./Pages/Experts";
import Blogs from "./Pages/Blogs";
import Subscription from "./Pages/Subscription";
import Registrants from "./Pages/Registrants";
import { LoginProvider } from "./Context/LoginContext";
import { ClientProvider } from "./Context/ClientContext";
import { NewsletterProvider } from "./Context/NewsletterContext";
import { InquiryProvider } from "./Context/InquiryContext";
import { ExpertsProvider } from "./Context/ExpertsContext";
import { BlogsProvider } from "./Context/BlogsContext";
import { ProgramsProvider } from "./Context/ProgramsContext";
import ProtectedRoute from "./ProtectedRoute";
import Banners from "./Pages/Banners";
import { BannerProvider } from "./Context/BannersContext";
import Payments from "./Pages/Payments";
import { PaymentsProvider } from "./Context/PaymentContext";
import Partners from "./Pages/Partners";
import Testimonials from "./Pages/Testimonials";
import { TestimonialsProvider } from "./Context/TestimonialsContext";
import { PartnerProvider } from "./Context/PartnersContext";

const App = () => {
  return (
    <Router>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/banners"
              element={
                <BannerProvider>
                  <Banners />
                </BannerProvider>
              }
            />
            <Route
              path="/clients"
              element={
                <ClientProvider>
                  <Clients />
                </ClientProvider>
              }
            />
            <Route
              path="/programs"
              element={
                <ProgramsProvider>
                  <Programs />
                </ProgramsProvider>
              }
            />
            <Route
              path="/experts"
              element={
                <ExpertsProvider>
                  <Experts />
                </ExpertsProvider>
              }
            />
            <Route
              path="/blogs"
              element={
                <BlogsProvider>
                  <Blogs />
                </BlogsProvider>
              }
            />
            <Route
              path="/subscriptions"
              element={
                <InquiryProvider>
                  <NewsletterProvider>
                    <Subscription />
                  </NewsletterProvider>
                </InquiryProvider>
              }
            />
            <Route
              path="/registrants"
              element={
                <ProgramsProvider>
                  <Registrants />
                </ProgramsProvider>
              }
            />
            <Route
              path="/payments"
              element={
                <PaymentsProvider>
                  <Payments />
                </PaymentsProvider>
              }
            />
            <Route
              path="/partners"
              element={
                <PartnerProvider>
                  <Partners />
                </PartnerProvider>
              }
            />
            <Route
              path="/testimonials"
              element={
                <TestimonialsProvider>
                  <Testimonials />
                </TestimonialsProvider>
              }
            />
          </Route>
        </Routes>
      </LoginProvider>
    </Router>
  );
};

export default App;
