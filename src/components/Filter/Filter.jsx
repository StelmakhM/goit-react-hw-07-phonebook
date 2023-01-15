import styles from "./Filter.module.css"
import { useDispatch } from "react-redux"
import { setFilter } from "../../redux/slices/filterSlice"

export default function Filter() {
	const dispatch = useDispatch()
	const filterHandler = (e) => {
		dispatch(setFilter(e.target.value))
	}

	return (
		<>
			<h2 className={styles.title}>Contacts</h2>
			<label className={styles.label}>
				Enter search query
				<input className={styles.input} type="text" name="filter" onChange={(e) => filterHandler(e)} />
			</label>
		</>
	)
}
