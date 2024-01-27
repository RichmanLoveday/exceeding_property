import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <div className="flex items-start w-full">
      <Button variant={"ghost"} onClick={() => navigate(-1)}>
        <ArrowLeft /> back
      </Button>
    </div>
  )
}
