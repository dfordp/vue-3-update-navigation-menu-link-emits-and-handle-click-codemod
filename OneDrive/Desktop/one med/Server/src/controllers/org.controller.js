import { deleteOrganizationById, getOrganizations, getOrganizationById, updateOrganizationById } from '../mongodb/models/organization.js';

export const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await getOrganizations();
        return res.status(200).json(organizations);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const organization = await getOrganizationById(id);

        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        return res.json(organization);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrganization = await deleteOrganizationById(id);
        return res.json(deletedOrganization);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminEmail } = req.body;

        if (!adminEmail){
            return res.sendStatus(400);
        }

        const updatedOrganization = await updateOrganizationById(id, { adminEmail });

        if (!updatedOrganization) {
            return res.sendStatus(404);
        }

        return res.status(200).json(updatedOrganization).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};