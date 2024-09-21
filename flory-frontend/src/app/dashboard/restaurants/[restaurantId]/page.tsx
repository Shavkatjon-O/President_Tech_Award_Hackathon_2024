import { getProvider, getProviderMeals } from "../../dashboard.api";
import RestaurantDetails from "./restaurant-details";

interface Props {
  params: {
    restaurantId: string;
  };
}

const Page = async ({ params }: Props) => {
  const [restaurantMeals, restaurantDetails] = await Promise.all([
    getProviderMeals(params.restaurantId),
    getProvider(params.restaurantId),
  ]);

  return (
    <RestaurantDetails
      restaurantDetails={restaurantDetails}
      meals={restaurantMeals}
    />
  );
};

export default Page;
