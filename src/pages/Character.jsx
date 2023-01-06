import { useParams } from "react-router-dom"
import { useCharacter } from "../hook/useCharacter"


function Character() {
    const { id } = useParams()

    const { error, data, loading } = useCharacter(id)

    if (loading) {
        return (<div>Loading ...</div>)
    }
    if (error !== undefined) {
        return (<div>Something went wrong</div>)
    }

    return (
        <div>
            <img src={data.character.image} alt={data.character.name} />
            <p>Created : <b>{data.character.created}</b></p>
            <p>Gender : <b>{data.character.gender}</b></p>
            <p>Location Name : <b>{data.character.location.name}</b></p>
            <p>Origin Name : <b>{data.character.origin.name} ({data.character.origin.type})</b></p>
            <p>Origin Dimension : <b>{data.character.origin.dimension}</b></p>
            <p>Species : <b>{data.character.species}</b></p>
            <p>Status : <b>{data.character.status}</b></p>
        </div>
    )
}

export default Character