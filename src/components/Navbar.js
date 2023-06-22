import React from "react";
import { useContext } from "react";
import { FavoriteProvider } from "../contexts/favoritesContext";
import FavoriteContext from "../contexts/favoritesContext";

const Navbar = () => {
    const {favoritePokemons} = useContext(FavoriteContext);
    const logoImg = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    return(
            <nav>
                <div>
                    <img
                        alt="Pokeapi-logo"
                        src={logoImg}
                        className="navbar-img"
                    />
                </div>
                <div>❤ {favoritePokemons.length} Favoritos </div>
                <div>Esse é um projetinho em React desenvolvido por Thulio Pereira 🤠</div>
            </nav>
    )
}

    export default Navbar