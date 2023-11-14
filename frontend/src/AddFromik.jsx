import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const AddItems = (props) => (
  <div className="AddItems">
    <Formik
      // Replace state with this:
      initialValues={{ textOfItem: ''}}
      // validation
      validationSchema={ Yup.object({
        textOfItem: Yup.string()
        .max(30, 'Task cannot be longer than 30 letters!')
        .min(3, 'Task needs to be at least 3 letters')
        .required('Please enter a to do')
      })}
      onSubmit={(values , { resetForm }) => {
        console.log(values);
        // Change what we pass to addOneItem
        props.addOneItem(values.textOfItem)
        // Reset the from 
        resetForm({
          values: { textOfItem: ''}
        })
      }}
    > 
      <Form >
          <Field type='text' placeholder='Add a to do' name='textOfItem' />
          <ErrorMessage name='textOfItem' />
          <button type="submit">Add</button>
        </Form>
    </Formik>

  </div>
)

export default AddItems