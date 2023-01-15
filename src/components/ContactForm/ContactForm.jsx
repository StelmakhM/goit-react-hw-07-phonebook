import styles from "./ContactForm.module.css";
import { getItems } from "../../redux/selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { addContact } from "../../redux/operations";

export default function ContactForm() {
	const dispatch = useDispatch();
	const contacts = useSelector(getItems);
	const normalizeValue = (value) => value.toLowerCase().trim();

	const onFormSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.elements.name.value;
		const phone = form.elements.phone.value;
		const exist = contacts.some((contact) => normalizeValue(contact.name) === normalizeValue(name));
		if (exist) {
			Notify.info("This contact is already in list");
			return;
		}
		dispatch(
			addContact({
				name,
				phone,
			})
		);
		form.reset();
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<h1>Phonebook</h1>
				<div className={styles.formControl}>
					<label>
						Name
						<input
							type="text"
							name="name"
							pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
							title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
							required
						/>
					</label>
					Number
					<input
						type="tel"
						name="phone"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						required
					/>
					<button type="submit">Add contact</button>
				</div>
			</form>
		</div>
	);
}
