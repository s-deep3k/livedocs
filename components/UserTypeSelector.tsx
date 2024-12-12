import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"

const UserTypeSelector = ({userType,setUserType, onClickHandler}:UserTypeSelectorParams) => {
    return (
        <Select value={userType} onValueChange={(type:UserType)=>{
            setUserType(type)
            onClickHandler && onClickHandler(type)
        }}>
            <SelectTrigger className="shad-select">
                <SelectValue/>
            </SelectTrigger>
            <SelectContent className="border-none bg-dark-200">
                <SelectItem value="viewer" className="shad-select-item">can view</SelectItem>
                <SelectItem value="editor" className="shad-select-item">can edit</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default UserTypeSelector