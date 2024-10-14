import { useEffect, useState } from "react";
import usePartner from "../../../Context/PartnersContext";
import host from "../../../Context/endpoints";

const Learning = () => {
  const { retrievePartners } = usePartner();
  const [partners, setPartners] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const response = await retrievePartners();
      setPartners(response);
    };
    setup();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5 bg-white max-md:px-5 w-full">
      <div className="text-xl font-bold text-center text-black whitespace-nowrap">
        OUR LEARNING PARTNERS
      </div>
      {partners ? (
        <div className="flex gap-4 w-full justify-center">
          {partners.map((partner) => {
            return (
              <img
                key={partner.partners_id}
                src={`${host}${partner.images}`}
                className="max-h-[35px] md:max-h-[50px] xl:max-h-[60px] w-fit object-contain"
              />
            );
          })}
        </div>
      ) : (
        <>No partners found</>
      )}
      <hr className="mt-5 border-gray-400 w-full max-w-[1300px] mx-auto" />
    </div>
  );
};

export default Learning;
