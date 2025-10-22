import "./MenuPage.css";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";
import MenuList from "../../components/menuList/MenuList";

const ENDPOINTS = {
    Seafood: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood",
    Dessert: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert",
};

function randomPrice(min = 5, max = 30) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

function normalizeMeal(meal, category) {
    return {
        id: meal.idMeal,
        name: meal.strMeal,
        category,
        thumb: meal.strMealThumb,
        price: randomPrice(),
    };
}

function MenuPage() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("all");

    const availableCategories = ["Seafood", "Dessert"];

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        Promise.all(
            Object.entries(ENDPOINTS).map(([cat, url]) =>
                fetch(url)
                    .then((res) => {
                        if (!res.ok) throw new Error(`Fallo al obtener ${cat}`);
                        return res.json();
                    })
                    .then((data) => (data.meals || []).map((m) => normalizeMeal(m, cat)))
            )
        )
            .then((arrays) => {
                const merged = arrays.flat();
                setItems(merged);
            })
            .catch((err) => setError(err.message || "Error al cargar"))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <Header
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                category={category}
                onCategoryChange={(c) => setCategory(c)}
                categories={availableCategories}
            />

            <main className="page-content">
                {isLoading && <p className="status">Loading...</p>}
                {error && <p className="status error">{error}</p>}
                {!isLoading && !error && (
                    <MenuList items={items} searchQuery={searchQuery} category={category} />
                )}
            </main>
            
            <Footer />
        </>
    );
}

export default MenuPage;
