import "./Header.css";

function Header({ searchQuery = "", onSearchChange, category = "all", onCategoryChange, categories = [] }) {
    return (
        <header className="app-header">
            <div className="header-inner">
                <h1 className="logo">Restaurante Ficticio</h1>

                <div className="controls" role="search" aria-label="Buscar en el menú">
                    <label htmlFor="search" className="visually-hidden">Buscar platos</label>
                    <input
                        id="search"
                        className="search-input"
                        placeholder="Buscar plato..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    />

                    <label htmlFor="category" className="visually-hidden">Filtrar por categoría</label>
                    <select
                        id="category"
                        className="category-select"
                        value={category}
                        onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
                    >
                        <option value="all">Todos</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </header>
    );
}

export default Header;