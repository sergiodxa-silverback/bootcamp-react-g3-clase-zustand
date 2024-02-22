import {
  Form,
  Link,
  LoaderFunctionArgs,
  json,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import apiCall from "../api";
import clsx from "clsx";

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let query = url.searchParams.get("query");
  if (!query) return json({ meals: [] as Meal[] });
  let { meals } = (await apiCall(`/search.php?s=${query}`)) as {
    meals: Meal[];
  };
  return json({ meals });
}

export function Component() {
  let { meals } = useLoaderData() as { meals: Meal[] };

  let navigation = useNavigation();
  let submit = useSubmit();

  let [searchParams] = useSearchParams();
  let query = searchParams.get("query") ?? "";

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h2 className="text-4xl font-bold my-4 font-lato">
          Buscador de recetas
        </h2>

        <Form className="h-10">
          <input
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Buscar por nombre"
            className="text-lg p-1 border-2 rounded-sm	border-slate-500	w-96 h-full font-lato mt-2"
            defaultValue={query}
            onChange={(event) => submit(event.currentTarget.form)}
          />

          <button className="bg-blue-600 text-white text-lg h-full ml-2 w-28 rounded hover:bg-blue-600 font-lato font-bold">
            Buscar
          </button>
        </Form>

        {navigation.state === "loading" && (
          <h6 className="mt-8">Cargando...</h6>
        )}

        <div
          className={clsx("flex flex-row flex-wrap	my-8 justify-center", {
            "filter grayscale": navigation.state === "loading",
          })}
        >
          {meals?.map((meal) => (
            <Link
              key={meal.idMeal}
              to={`/meal/${meal.idMeal}`}
              className="mx-2 my-4 w-40 h-52 flex flex-col items-start text-ellipsis overflow-hidden"
            >
              <img src={meal.strMealThumb} className="w-40 cursor-pointer" />
              <p className="font-lato">{meal.strMeal}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <h6 className="text-red">Ha ocurrido un error</h6>;
}
