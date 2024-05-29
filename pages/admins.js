import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminsPage() {
  const [email, setEmail] = useState('');
  const [adminEmails, setAdminEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addAdmin(ev) {
    ev.preventDefault();
    axios.post('/api/users/admins', { email })
      .then(res => {
        console.log(res.data);
        alert('Admin created!');
        setEmail('');
        loadAdmins();
      })
      .catch(err => {
        alert(`Error!\n${err.response.data.message}`);
      });
  }

  function deleteAdmin(_id, email) {
    const confirmDelete = window.confirm(`Do you want to delete admin ${email}?`);

    if (confirmDelete) {
      axios.delete('/api/users/admins?_id=' + _id)
        .then(() => {
          alert('Admin deleted!');
          loadAdmins();
        });
    }
  }

  function loadAdmins() {
    setIsLoading(true);
    axios.get('/api/users/admins')
      .then(res => {
        setAdminEmails(res.data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <Layout>
      <h3 className="uppercase grey_text">Administratori</h3>
      <h4 className="uppercase grey_text">Adaugă un administrator nou</h4>
      <form onSubmit={addAdmin}>
        <div className="flex flex-col md:flex-row gap-2 mt-10">
          <input
            type="text"
            className="mb-2 md:mb-0 w-full md:w-[15rem]"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            placeholder="Google Email"
          />
          <button
            type="submit"
            className="btn-primary py-1 whitespace-nowrap rounded-lg md:ml-2"
          >
            Adaugă administrator
          </button>
        </div>
      </form>
      <h4 className="uppercase grey_text mt-10">Administratori existenți</h4>
      {isLoading ? (
      null
      ) : (
        <div className="basic mt-2">
          {adminEmails.length > 0 &&
            adminEmails.map(adminEmail => (
              <div key={adminEmail._id} className="flex justify-between items-center">
                <div className="text-left">{adminEmail.email}</div>
                {/* <div>{adminEmail.createdAt && prettyDate(adminEmail.createdAt)}</div> */}
                <div>{adminEmail.createdAt}</div>
                <div>
                  <button onClick={() => deleteAdmin(adminEmail._id, adminEmail.email)} className="btn-red">
                    Șterge
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </Layout>
  );
}

export default AdminsPage;
