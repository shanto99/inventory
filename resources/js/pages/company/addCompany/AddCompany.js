import React from "react";

class AddCompany extends React.Component {
    constructor(props){
        super(props);

        this.state({
            code: '',
            name: '',
            address: '',
            contactPerson: '',
            phone: '',
            email: '',
            vatRegNo: '',
            bin: '',
            tin: '',
            country: '',
            iUser: '',
            iDate: null,
            eUser: '',
            eDate: null
        });
    }
    handleCompanySubmit = () => {

    }

    render()
    {
        const {code, name} = this.state;
        return (
            <form onSubmit={this.handleCompanySubmit}>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="form-label">Company code</label>
                        <input type="text"
                            required
                            value={code} className="form-control"
                            onChange={(e) => this.setState({ code: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="form-label">Company name</label>
                        <input type="text"
                            required
                            value={name} className="form-control"
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button type="submit" className="btn btn-primary mt-5">
                        Add
                    </button>
                </div>
            </form>
        )
    }
}

export default AddCompany;
