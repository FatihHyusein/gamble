import BaseComponent from '../../../../../base/BaseComponent';

class Contact extends BaseComponent {
    render() {
        return (
            <div id="contact">
                <form action="">
                    <input type="text" placeholder="USERNAME..."/>
                    <input type="email" placeholder="EMAIL ADDRESS..."/>
                    <select name="" id="">
                        <option value="">asd</option>
                    </select>
                    <textarea name="" id="" cols="30" rows="10">

                    </textarea>
                </form>
                <button className="bg-green fright">SUBMIT</button>
                <div className="clearfix"></div>
            </div>
        )
    }
}

module.exports = Contact;
