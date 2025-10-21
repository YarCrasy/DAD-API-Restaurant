import "./MenuItem.css";

function MenuItem({ id, name, category, thumb, price }) {
    const fmtPrice = (p) => `${p.toFixed(2)} €`;

    return (
        <article className="menu-item" aria-labelledby={`title-${id}`}>
            <div className="thumb-wrap">
                <img src={thumb} alt={name} className="menu-item-thumb" />
            </div>
            <div className="menu-item-body">
                <h3 id={`title-${id}`} className="menu-item-name">{name}</h3>
                <div className="menu-item-meta">
                    <span className="menu-item-category">{category || "Sin categoría"}</span>
                    <span className="menu-item-price">{fmtPrice(price)}</span>
                </div>
            </div>
        </article>
    );
}

export default MenuItem;