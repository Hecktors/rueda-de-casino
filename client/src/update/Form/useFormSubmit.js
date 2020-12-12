export default useFormSubmit(addMove){
    function submitNewMove(newMove){
        addMove(newMove)
    }
    return [submitNewMove]
}