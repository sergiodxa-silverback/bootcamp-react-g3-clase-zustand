import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import apiCall from "../api";

export async function loader({ params }: LoaderFunctionArgs) {
  let { mealId } = params;
  let response = await apiCall(`/lookup.php?i=${mealId}`);
  return { meal: response.meals?.[0] as Meal };
}

export function Component() {
  let { meal } = useLoaderData() as { meal: Meal };

  return (
    <div className="p-2">
      <h2 className="text-4xl font-lato font-bold">Recetario</h2>
      {Object.keys(meal)?.length ? (
        <div className="flex py-8 px-4">
          <div className="w-1/4 flex flex-col items-start mb-2">
            <label className="font-lato font-bold text-xl">
              {meal.strMeal}
            </label>
            <img
              src={meal?.strMealThumb}
              alt={meal?.strMeal}
              className="w-80 max-w-6xl"
            />
          </div>
          <div className="w-3/4 flex flex-col items-start p-4">
            <label className="text-lg font-lato">Instrucciones</label>
            <p className="text-left font-lato">{meal?.strInstructions}</p>
          </div>
        </div>
      ) : undefined}
    </div>
  );
}

export function ErrorBoundary() {
  return <h6>Ha ocurrido un error</h6>;
}
