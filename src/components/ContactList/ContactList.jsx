import styles from "./ContactList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getFilter, getItems } from "../../redux/selectors/selectors";
import { removeContact } from "../../redux/operations";

export default function ContactList() {
	const contacts = useSelector(getItems);
	const filter = useSelector(getFilter);
	const dispatch = useDispatch();
	const deleteContact = (id) => {
		return () => {
			dispatch(removeContact(id));
		};
	};

	const normalizeValue = (value) => value.toLowerCase().trim();
	const visibleContacts = contacts.filter((contact) => normalizeValue(contact.name).includes(normalizeValue(filter)));
	return (
		<>
			<ul className={styles.list}>
				{visibleContacts.map(({ id, name, phone }) => (
					<li className={styles.item} key={id}>
						{name},<br />
						{phone}
						<button onClick={deleteContact(id)} className={styles.button} type="button">
							Delete
						</button>
					</li>
				))}
			</ul>
		</>
	);
}
