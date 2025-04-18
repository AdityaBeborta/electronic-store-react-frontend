import { Badge, ListGroup } from "react-bootstrap";
import { BiBookAdd } from "react-icons/bi";
import {
  MdManageSearch,
  MdOutlineCategory,
  MdOutlineViewInAr,
} from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiApps2AddLine } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbCategoryPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export const SideMenu = () => {
  return (
    <>
      <ListGroup className="sticky-top">
        <ListGroup.Item as={NavLink} to="/admin/home" action>
          <SiHomeassistantcommunitystore size={20} />{" "}
          <span className="ms-2">Home</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/add-category" action>
          <TbCategoryPlus size={20} />{" "}
          <span className="ms-2">Add Category</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/view-categories" action>
          <MdOutlineCategory size={20} />{" "}
          <span className="ms-2">View Categories</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/add-product" action>
          <RiApps2AddLine size={20} /> <span className="ms-2">Add Product</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/view-products" action>
          <MdOutlineViewInAr size={20} />{" "}
          <span className="ms-2">View Products</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/manage-orders" action>
          <MdManageSearch size={20} />{" "}
          <span className="ms-2">Manage Orders</span>
        </ListGroup.Item>
        <ListGroup.Item
          as={NavLink}
          to="/admin/manage-users"
          action
          className="d-flex justify-content align-items-start"
        >
          <PiUsersThreeLight size={20}/>
          <span className="ms-2">Manage Users</span>
          <Badge bg="danger" className="ms-5" pill>
            New
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};
