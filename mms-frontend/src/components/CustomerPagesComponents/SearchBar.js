// bootstrap components
import { InputGroup, Button, FormControl } from 'react-bootstrap'

function SearchBar(props) {

  const { handleSearch } = props

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          className='form-floating'
          placeholder='Search by first name'
          aria-label="Search by first name"
          aria-describedby="basic-addon1"
          onChange={handleSearch}
        />
        <Button variant="outline-secondary" id="button-addon1">
          Search
        </Button>
      </InputGroup>
    </div>
  )
}

export default SearchBar