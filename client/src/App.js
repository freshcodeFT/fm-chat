import { useEffect, useLayoutEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ChatActionCreators from './actions/chatActionCreators'

function App () {
  const { messages, isFetching, error } = useSelector(state => state.chat)
  const dispatch = useDispatch()
  const { getMessagesRequest, createMessageRequest } = bindActionCreators(
    ChatActionCreators,
    dispatch
  )
  useLayoutEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  })
  useEffect(() => {
    getMessagesRequest()
  }, [])

  return (
    <div>
      <ul
        style={{
          paddingBottom: '50px'
        }}
      >
        {isFetching && <li>Messages are loading</li>}
        {messages.map(msg => (
          <li key={msg._id}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
      <Formik
        onSubmit={(values, formikBag) => {
          createMessageRequest(values)
          //formikBag.setFieldValue('text', '')
        }}
        initialValues={{
          name: '',
          text: ''
        }}
      >
        <Form
          style={{
            position: 'fixed',
            bottom: 0
          }}
        >
          <Field name='name' placeholder='name' />
          <Field name='text' placeholder='text' />
          <button type='submit'>Send message</button>
        </Form>
      </Formik>
    </div>
  )
}

export default App
