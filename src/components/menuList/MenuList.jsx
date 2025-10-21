import "./MenuList.css";
import MenuItem from "../menuItem/MenuItem";
import { useMemo, useState } from "react";

function MenuList({ items = [], searchQuery = "", category = "all" }) {
    const [sortKey, setSortKey] = useState("price"); // 'price' | 'name' | null
    const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'

    const normalize = (s) => (s || "").toLowerCase();

    const filtered = useMemo(() => {
        return items.filter((it) => {
            const matchesSearch = normalize(it.name).includes(normalize(searchQuery));
            const matchesCategory =
                category === "all" || (it.category || "").toLowerCase() === category.toLowerCase();
            return matchesSearch && matchesCategory;
        });
    }, [items, searchQuery, category]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        const arr = [...filtered];
        arr.sort((a, b) => {
            if (sortKey === "price") {
                return sortDir === "asc" ? a.price - b.price : b.price - a.price;
            } else if (sortKey === "name") {
                return sortDir === "asc"
                    ? (a.name || "").localeCompare(b.name || "")
                    : (b.name || "").localeCompare(a.name || "");
            }
            return 0;
        });
        return arr;
    }, [filtered, sortKey, sortDir]);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    const indicator = (key) => (sortKey === key ? (sortDir === "asc" ? " ↓" : " ↑") : "");

    return (
        <section className="menu-list">
            <div className="list-header">
                <h2>Nuestro Menú</h2>
                <div className="sort-controls">
                    <button
                        type="button"
                        className={`sort-btn ${sortKey === "price" ? "active" : ""}`}
                        onClick={() => handleSort("price")}
                    >
                        Precio{indicator("price")}
                    </button>
                    <button
                        type="button"
                        className={`sort-btn ${sortKey === "name" ? "active" : ""}`}
                        onClick={() => handleSort("name")}
                    >
                        Nombre{indicator("name")}
                    </button>
                </div>
            </div>

            <div className="menu-grid">
                {sorted.map((item) => (
                    <MenuItem key={item.id} {...item} />
                ))}
            </div>
            {sorted.length === 0 && <p className="no-results">No se encontraron platos.</p>}
        </section>
    );
}

export default MenuList;
