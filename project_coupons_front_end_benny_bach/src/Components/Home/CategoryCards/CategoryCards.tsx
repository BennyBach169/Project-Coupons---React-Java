import { CategoryCard } from "./CategoryCard/CategoryCard";
import "./CategoryCards.css";

export function CategoryCards(): JSX.Element {
    return (
        <div className="CategoryCards">
			<CategoryCard categoty="Vacation"/>
            <CategoryCard categoty="Restaurant"/>
            <CategoryCard categoty="Cinema"/>
            <CategoryCard categoty="Food"/>
            <CategoryCard categoty="Electricity"/>
        </div>
    );
}
