import { useParams } from "react-router-dom"

export const FlowChart = () => {
  const { id } = useParams();

  return (
    <>Flow Chart {id}</>
  )
}