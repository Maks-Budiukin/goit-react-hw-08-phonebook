
import styled from "styled-components";
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from "react-redux";
import { contactsFilter } from "redux/filter/filter.slice";

const StyledFilter = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-bottom: 20px;
    label {
        font-weight: 500;
        margin-bottom: 8px;
    }
    input {
        width: 200px;
        border: 1px solid silver;
        border-radius: 4px;

        &:hover,
        &:focus  {
        outline: none;
        border: 1px solid skyblue;
        }
    }
`

export const Filter = () => {
    const filterInpudId = nanoid();
    
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();


    const onInputChange = (event) => {
        dispatch(contactsFilter(event.target.value))
    }

    return (
        <StyledFilter>
        <label htmlFor={filterInpudId}>Find contacts by name </label>
    <input
        type="text"
        name="filter"
        id={filterInpudId}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={filter}
        onChange={onInputChange}
            />
        </StyledFilter>
    )
}