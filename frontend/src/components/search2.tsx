import { ChangeEventHandler, useEffect } from "react"

interface SearchData {
    firstName: string,
    lastName: string,
}

interface SearchBarProps {
    searchHandler: ChangeEventHandler,
    value: string,
    placeholder: string,
}

const SearchBar = (props: SearchBarProps) => {
    return (
        <input
            type="search"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.searchHandler}
        />
        
    )
}

const Search = () => {
    const [searchData, setSearchData] = useState<SearchData[]>([])
    const [valueSearch, setValueSearch] = useState<string>('')
    const [getErr, setgetError] = useState<boolean>('false')

    useEffect (() => {
        const fetchData = async () => {
            try { const response = await fetch(URL);
            const data = response.json;
            setSearchData(data)}
            catch (error) {
                setgetError(error)
            }
        };

        fetchData();
    }, []);

    const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        setSearchData(e.currentTarget.value);
    };

    return (
        <div className="style">
            <SearchBar 
                searchHandler = {searchHandler}
                value = {valueSearch}
                placeholder = {`Search by name`}
            />

        </div>

    )
    
}