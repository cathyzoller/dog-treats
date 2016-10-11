import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-apollo'
import gql from 'graphql-tag'
import { setTreat } from '../store/actions'
import { StyleSheet, css } from 'aphrodite'

import DogTreats from '../components/DogTreats'

class DogtreatsContainer extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    addTreat: React.PropTypes.object.isRequired,
    mutations: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { newTreat: '', loading: true }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loading === false) {
      this.setState({ loading: false })
    }
  }

  setFieldValue(e) {
    this.setState({ newTreat: e.currentTarget.value })
  }

  onHandleSubmit() {
    this.props.handleSubmit(this.state.newTreat)
    this.setState({ newTreat: '' })
    this.refs.input.value = ''
  }

  render() {
    const { data, mutations, addTreat, handleSubmit } = this.props
    const { loading } = this.state
    const styles = StyleSheet.create({
      wrapper: {
        backgroundColor: 'white',
        fontSize: '18px',
        width: '100%',
        paddingLeft: '150px',
        paddingRight: '150px'
      },
      leftSide: {
        width: '50%'
      },
      rightSide: {
        float: 'right',
        marginTop: '-550px',
        width: '40%'
      }
    })
    if (loading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      const treats = data.allTreats.treats.map((treat) => { return treat.name })
      return (
        <div className={css(styles.wrapper)}>
          <div className={css(styles.lefttSide)}>
            <img src={require('../assets/dog-1_wag.png')}></img>
            <DogTreats />
          </div>
          <div className={css(styles.rightSide)}>
            <h2>Treats</h2>
            <ul>
              {data.allTreats.treats.map((treat, index) => { return (<li key={index}>{treat.name}</li>) })}
            </ul>

            <div className='form-group'>
              <span><input ref='input' onChange={(e) => this.setFieldValue(e)} /></span>
              <span><button onClick={async () => {
                // This is temporary until https://github.com/apollostack/react-apollo/issues/93 is done
                this.onHandleSubmit()
                let mutationResult = await mutations.addTreat(this.state.newTreat)
                if (mutationResult)
                  data.refetch()
              }}>
                Add
              </button></span>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (name) => dispatch(setTreat(name))
})

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      {
        allTreats {
          treats {
            name
          }
        }
      }
    `
  }
})


const mapMutationsToProps = () => ({
  addTreat: (name) => ({
    mutation: gql`
      mutation addTreat(
        $name: String!
      ) {
        addTreat(name: $name) {
          name
        }
      }
    `,
    variables: {
      name
    }
  }),
  induceError: () => ({
    mutation: gql`
      mutation induceError {
        induceError
      }
    `
  })
})

export default connect({
  mapDispatchToProps,
  mapQueriesToProps,
  mapMutationsToProps
})(DogtreatsContainer)
