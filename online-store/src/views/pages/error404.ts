const Error404 = {

    render : async () => {
        const view =  `
            <section class="section">
                <h1> 404 Error. No such page</h1>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;