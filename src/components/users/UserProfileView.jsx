import { Card, Container, Table } from "react-bootstrap";
import profileImage from "./../../asserts/defaultProfile.jpg";
import { BASE_URL } from "../../services/helper.service";
export const UserProfileView = ({ user = null }) => {
  const profileStyle = {
    maxHeight: "200px",
    maxWidth: "200px",
    borderRadius: "50%",
  };
  return (
    <>
      {user != null ? (
        <Card className="m-3">
          <Card.Body>
          {console.log(user)}
            <Container className="text-center my-3">
              <img
                // className="border border-dark"
              
                src={user.imageName ? BASE_URL+'/user/v1/retrieve/profilepic/'+user.userId : profileImage}
                className="w-24 h-24 rounded-full object-cover shadow-lg"

                alt="profile image"
              />
            </Container>
            <h2 className="text-center text-uppercase font-weight fw-bold">
              {user.name}
            </h2>
            <div className="mt-3">
              <Table hover bordered responsive>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{user.gender}</td>
                  </tr>
                  <tr>
                    <td>About</td>
                    <td>{user.about}</td>
                  </tr>
                  <tr>
                    <td>Roles</td>
                    <td>
                      {user.roles.map((role) => (
                        <div>{role.roleType}</div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <h3>something went wrong file fetching</h3>
      )}
    </>
  );
};
