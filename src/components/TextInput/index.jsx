import './styles.css';

export const TextInput = ({ searchValeu, handleChange }) => {
    return (
        <input className="text-input"
            onChange={handleChange}
            value={searchValeu}
            type="search"
            placeholder="Type your search"
        />
    );
}