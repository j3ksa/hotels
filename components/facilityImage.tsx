import { IconType } from "react-icons"

interface Props {
    Icon: IconType
}

const FacilityImage = ({Icon}: Props) => {
    return (
        <Icon className="text-lg"/>
    )
}

export default FacilityImage