import { Link } from "react-router-dom";
import { useCharacters } from "../hook/useCharacters"

function CharactersList() {
    const { error, data, loading } = useCharacters();

    if (loading) {
        return (<div>Loading ...</div>)
    }
    if (error !== undefined) {
        return (<div>Something went wrong</div>)
    }
    return (
        <>
            {
                data?.characters.results.map((character, index) => {
                    return (
                        <>
                            <Link to={`/who-is-this/${character.id}`} key={index}>
                                <img src={character.image} alt={character.name} />
                                <p>{character.name}</p>
                            </Link>
                        </>
                    )
                })
            }
        </>
    )
}

export default CharactersList