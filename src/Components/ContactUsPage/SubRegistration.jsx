import { Link } from "react-router-dom";



function SubRegistration() {
  return (
    <div className="flex justify-center items-center min-h-screen py-10 -mt-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg border max-w-3xl w-full md:px-20">
        <div className="text-center text-[#DF0000]  text-2xl font-bold mb-6">
          REGISTRATION
        </div>
        <div className="flex gap-0 mt-7 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col text-black max-md:max-w-full">
            <div className="text-base font-bold max-md:max-w-full">
              Terms and Conditions:
            </div>
            <div
              className="mt-2.5 text-xl max-md:max-w-full ml-8"
              style={{ maxHeight: "400px", overflowY: "auto", }}
            >
              <ol>
                <li>
                  <span className="text-sm">
                    1. Inspire Leadership Consultancy, Inc. shall not have any
                    liability or be deemed to be in default for any delay or
                    failure in performance under this Agreement resulting from
                    acts beyond its control, including without limitation acts
                    of God, acts or regulations of any governmental, national
                    emergency, accident, fire, lightning and the like.
                  </span>
                </li>
              <div className="my-3"></div>
                <li>
                  <span className="text-sm">
                    2. Inspire Leadership Consultancy reserves the right to
                    re-schedule its event/s to another date given such uncertain
                    circumstances.
                  </span>
                </li>
                <br></br>
                <li>
                  <span className="text-sm">
                    3. In the event the registrant cannot fill the slot of this
                    program, Inspire Leadership Consultancy should be informed
                    at least 5 working days prior to the event. Payment done is
                    100% non-refundable but can be used for other programs of
                    Inspire. If the registrant fails to do so, his slot is
                    considered as used. Kindly be advised that this does not
                    apply to promo or discounted rates.
                  </span>
                </li>
                <br></br>
                <li>
                  <span className="text-sm">
                    4. For registrants who wish to cancel their attendance 4
                    working days prior to the event, payment is strictly
                    non-refundable.
                  </span>
                </li>
              </ol>
              <br />
              <span className="text-sm">
                Please pay within the permitted time. Otherwise, your seat will
                be forfeited.
              </span>
              <span className="text-sm">
                For bank payments, do not forget to send your deposit slip with
                participant's full name and contact no. to{" "}
                <span className="text-sm text-[#DF0000] ">
                  payments.inspire@gmail.com
                </span>
              </span>
              <br />
              <br />
              <span className="text-base font-bold leading-6">
                You may also send your questions, suggestions, and
                clarifications to:
              </span> <br />
              <span className="text-sm leading-4 text-[#DF0000] ">
                ask@inspireleaders.com.ph
              </span>
              <br />
              <span className="text-sm leading-4">(02) 7776038</span>
              <br />
              <span className="text-sm leading-4">09988417217</span>
              <br />
              <span className="text-sm leading-4">09175614673</span>
              <br />
              <br />
              <span className="text-base font-bold leading-6">
                Kindly fill out the form in the next to register after agreeing
                to our Terms and Conditions.
              </span>
              <br />
              <span className="text-sm leading-4">
                Inspire currently accepts Cash and Check payment methods.
                Payment should be made within 2 days after registration for
                individual participants and within 4 days for corporate
                participants.
              </span>
              <br />
              <br />
              <span className="text-base font-bold leading-6">NOTE: </span>
              <span className="text-sm leading-4">
                Please ensure that you have provided the right email address and
                contact details. We will be sending your invoice and seminar
                reminders via email.
              </span>
              <br />
              <span className="text-sm leading-4">
                Inspire has the right not to accept participants or move the
                schedule of the program whatever it may deem necessary.
              </span>
            </div>
            <Link to="/registration" className="flex justify-center items-center px-5 py-2.5 mt-6 max-w-full text-base font-bold text-white whitespace-nowrap bg-[#DF0000]  rounded-xl max-md:px-5 max-md:max-w-full">
              PROCEED
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubRegistration;
