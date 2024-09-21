"use client";

import React from "react";
import { TMeal, TProvider } from "../../dashboard.api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/utils";

interface Props {
  meals: TMeal[];
  restaurantDetails: TProvider;
}

type TCartItem = {
  quantity: number;
  meal: TMeal;
};

const RestaurantDetails = ({ meals, restaurantDetails }: Props) => {
  const [cart, setCart] = React.useState<TCartItem[]>([]);

  const handleAddToCart = (meal: TMeal) => {
    const existingItem = cart.find((item) => item.meal.id === meal.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }
    setCart([...cart, { meal, quantity: 1 }]);
  };

  const handleAddQuantity = (meal: TMeal) => {
    const existingItem = cart.find((item) => item.meal.id === meal.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  };

  const handleRemoveQuantity = (meal: TMeal) => {
    const existingItem = cart.find((item) => item.meal.id === meal.id);

    if (!existingItem) {
      return;
    }

    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.meal.id !== meal.id));
      return;
    }

    setCart(
      cart.map((item) =>
        item.meal.id === meal.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const total = cart.reduce((acc, item) => {
    return acc + +item.meal.price * item.quantity;
  }, 0);

  return (
    <div className="grid sm:grid-cols-[3fr_1fr] bg-gray-100 gap-4">
      <div className="px-8 overflow-auto sm:order-1 order-2">
        <div className="mb-8">
          <div className="relative h-64 rounded-lg overflow-hidden mb-4">
            <img
              src={restaurantDetails.image || "/placeholder.svg"}
              alt={restaurantDetails.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-2 rounded">
              <h1 className="text-3xl font-bold">{restaurantDetails.title}</h1>
              <div className="space-x-1">
                <span className="text-sm">{restaurantDetails.rating}</span>
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meals.map((meal) => (
            <Card key={meal.id}>
              <CardHeader>
                <CardTitle>{meal.title}</CardTitle>
                <CardDescription>{meal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={meal.image || "/placeholder.svg"}
                  alt={meal.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-2xl font-bold">{+meal.price} UZS</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleAddToCart(meal)}
                  className="w-full"
                >
                  Add
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 shadow-md sm:order-2 order-1">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <ShoppingCart className="mr-2" />
          Cart
        </h2>
        <Separator className="my-4" />
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is currently empty
          </div>
        ) : (
          cart.map((item) => {
            return (
              <div key={item.meal.id}>
                <div className="">
                  <p className="w-2/3">{item.meal.title}</p>
                  <div className="flex items-center justify-start gap-2 mt-2">
                    <Button
                      onClick={() => handleRemoveQuantity(item.meal)}
                      size="icon"
                      className="p-1 shrink-0"
                    >
                      -
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      onClick={() => handleAddQuantity(item.meal)}
                      size="icon"
                      className="p-1 shrink-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            );
          })
        )}
        {cart.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <p>Total</p>
              <p className="font-bold">{formatNumber(total)} UZS</p>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
