// redux imports
import { useGetCampaignsQuery } from "../../features/apiSlice";
// component imports
import CampaignCard from "../../components/CampaignCard";
// static asset imports
import GoldenRetriever from "../../assets/categoryBanners/GoldenRetriever.jpg";

function AnimalCategory() {
  const { data, isLoading } = useGetCampaignsQuery("Animal");

  return (
    <div className="">
      <section id="header" className="my-10 flex justify-center">
        <h1 className="rounded-full bg-[#E9F1E4] py-10 text-center text-4xl font-medium text-[#FFB703] md:w-2/3">
          Explore Campaigns in Animal Category
        </h1>
      </section>
      <section id="picWithQuote" className="p-6">
        <div className="flex w-full flex-col rounded-lg bg-[#E9F1E4] md:flex-row">
          <img
            src={GoldenRetriever}
            alt=""
            className="h-auto max-h-96 w-full rounded-lg object-cover md:w-1/2"
          />
          <div
            id="quote"
            className="flex flex-grow items-center p-6 md:p-8 lg:p-14"
          >
            <blockquote className="text-center text-base italic sm:text-lg md:text-left md:text-xl lg:text-2xl xl:text-3xl">
              &quot;The greatness of a nation and its moral progress can be
              judged by the way its animals are treated&quot; - Mahatma Gandhi.
            </blockquote>
          </div>
        </div>
      </section>
      <section className="p-6">
        <div
          id="sampleCampaigns"
          className="rounded-lg bg-[#E9F1E4] p-4 md:flex md:flex-wrap md:justify-around"
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : data.campaigns ? (
            <div className="md:flex md:flex-wrap md:justify-around">
              {data.campaigns.map((item) => (
                <CampaignCard
                  key={item._id}
                  campaignId={item._id}
                  title={item.title}
                  createdBy={item.createdBy}
                  description={item.description}
                  targetAmount={item.targetAmount}
                  deadline={item.deadline}
                  amountRaised={item.amountRaised}
                />
              ))}
            </div>
          ) : (
            <div>No campaigns to show </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AnimalCategory;
