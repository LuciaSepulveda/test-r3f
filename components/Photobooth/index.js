const DefaultLayout = ({ children }) => {

    return (
        <iframe
            src={
                'https://nissanfrontierexperience.com/photobooth/index.html'
            }
            height="100%"
            width="100%"
            className="iframe-photobooth"
        />
                       
    );
};

const LayoutWrapper = (props) => (
    <DefaultLayout {...props}>{props.children}</DefaultLayout>
);

export default LayoutWrapper;
