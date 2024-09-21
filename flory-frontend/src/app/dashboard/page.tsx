import Image from "next/image";
import Link from "next/link";
import { getProviders } from "./dashboard.api";

const restaurants = [
  {
    id: 1,
    name: "KFC",
    rating: 4.9,
    price: "$$$",
    delivery: "Free delivery",
  },
  {
    id: 2,
    name: "Oqtepa Lavash",
    rating: 4.7,
    price: "$$$",
    delivery: "Free delivery",
  },
  {
    id: 3,
    name: "EVOS",
    rating: 4.7,
    price: "$$$",
    delivery: "Free delivery",
  },
  {
    id: 4,
    name: "STREET 77",
    rating: 4.7,
    price: "$$$",
    delivery: "Free delivery",
  },
];

const Page = async () => {
  const providers = await getProviders();

  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Shops</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {providers.map((provider) => {
            return (
              <div
                key={provider.id}
                className="bg-white p-4 rounded-lg shadow-md w-40 flex-shrink-0 relative"
              >
                <Image
                  src={provider.image || "/placeholder.svg"}
                  alt={provider.title}
                  className="w-full h-20 object-cover rounded-lg"
                  width="80"
                  height="80"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <p className="mt-2 text-center">{provider.title}</p>
                <Link
                  className="absolute inset-0"
                  href={`/dashboard/restaurants/${provider.id}`}
                />
              </div>
            );
          })}
          <div className="bg-white p-4 rounded-lg shadow-md w-40 flex-shrink-0">
            <Image
              src="/placeholder.svg"
              alt="Shop 5"
              className="w-full h-20 object-cover rounded-lg"
              width="80"
              height="80"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
            <p className="mt-2 text-center">La Sposa</p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {restaurants.map((restaurant) => {
            return (
              <div
                key={restaurant.id}
                className="bg-white p-4 rounded-lg shadow-md relative"
              >
                <Image
                  src="/placeholder.svg"
                  alt="Restaurant 1"
                  className="w-full h-32 object-cover rounded-lg"
                  width="200"
                  height="120"
                  style={{ aspectRatio: "200/120", objectFit: "cover" }}
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                  <p className="text-sm text-gray-500">
                    {restaurant.rating} Great {restaurant.price}
                  </p>
                  <p className="text-sm text-green-500">
                    {restaurant.delivery}
                  </p>
                </div>
                <Link className="absolute inset-0" href="/restaurant/1" />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Page;
