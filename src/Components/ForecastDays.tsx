// Proxímas temperaturas do dia
// Eu tenho que bolar isso ainda

interface Props {
    isLoading: boolean;
}
export default function ForecastDays({isLoading}: Props){
    return (
		<section className='forecast-days card-surface'>
            {!isLoading ? 
            <>
                <ul>
                
                </ul>
            </>
            :
            <div className='loader-div'>
                <div className='loader'></div>
                <p>Carregando...</p>
            </div> 
        }</section>
    )
}