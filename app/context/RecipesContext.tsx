// app/context/RecipesContext.tsx
import React, { createContext, useState, useContext } from "react";

interface Recipe {
    id: string;
    title: string;
    description: string;
    portion: string;
    prepTime: string;
    rating: string;
    mainImage: string | null;
    category: string;
}

interface RecipesContextData {
    recipes: Recipe[];
    addRecipe: (recipe: Recipe) => void;
}

const RecipesContext = createContext<RecipesContextData | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const addRecipe = (recipe: Recipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, recipe]);
    };

    return (
        <RecipesContext.Provider value={{ recipes, addRecipe }}>
            {children}
        </RecipesContext.Provider>
    );
};

export const useRecipes = () => {
    const context = useContext(RecipesContext);
    if (!context) {
        throw new Error("useRecipes deve ser usado dentro de um RecipesProvider");
    }
    return context;
};
