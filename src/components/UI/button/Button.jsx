import classes from './button.module.scss'

const Button = ({ children, ...props }) => {

    return (
        <button {...props} className={classes.button}>
            {children}
        </button>
    )
}

export default Button