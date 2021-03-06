const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLUnionType,
	GraphQLString,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');
const InstantScalar = require('../scalars/instant.scalar.js');

/**
 * @name exports
 * @summary AppointmentResponse Schema
 */
module.exports = new GraphQLObjectType({
	name: 'AppointmentResponse',
	description:
		'A reply to an appointment request for a patient and/or practitioner(s), such as a confirmation or rejection.',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'AppointmentResponse_Enum_schema',
					values: { AppointmentResponse: { value: 'AppointmentResponse' } },
				}),
			),
			description: 'Type of resource',
		},
		_id: {
			type: require('./element.schema.js'),
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		id: {
			type: IdScalar,
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		meta: {
			type: require('./meta.schema.js'),
			description:
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.schema.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		_language: {
			type: require('./element.schema.js'),
			description: 'The base language in which the resource is written.',
		},
		language: {
			type: CodeScalar,
			description: 'The base language in which the resource is written.',
		},
		text: {
			type: require('./narrative.schema.js'),
			description:
				"A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(require('./resourcelist.schema')),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the resource and that modifies the understanding of the element that contains it and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		identifier: {
			type: new GraphQLList(require('./identifier.schema.js')),
			description:
				'This records identifiers associated with this appointment response concern that are defined by business processes and/ or used to refer to it when a direct URL reference to the resource itself is not appropriate.',
		},
		appointment: {
			type: new GraphQLNonNull(
				new GraphQLUnionType({
					name: 'AppointmentResponseappointment_appointment_Union',
					description: 'Appointment that this response is replying to.',
					types: () => [require('./appointment.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'Appointment') {
							return require('./appointment.schema.js');
						}
					},
				}),
			),
			description: 'Appointment that this response is replying to.',
		},
		_start: {
			type: require('./element.schema.js'),
			description:
				'Date/Time that the appointment is to take place, or requested new start time.',
		},
		start: {
			type: InstantScalar,
			description:
				'Date/Time that the appointment is to take place, or requested new start time.',
		},
		_end: {
			type: require('./element.schema.js'),
			description:
				'This may be either the same as the appointment request to confirm the details of the appointment, or alternately a new time to request a re-negotiation of the end time.',
		},
		end: {
			type: InstantScalar,
			description:
				'This may be either the same as the appointment request to confirm the details of the appointment, or alternately a new time to request a re-negotiation of the end time.',
		},
		participantType: {
			type: new GraphQLList(require('./codeableconcept.schema.js')),
			description: 'Role of participant in the appointment.',
		},
		actor: {
			type: new GraphQLUnionType({
				name: 'AppointmentResponseactor_actor_Union',
				description:
					'A Person, Location, HealthcareService, or Device that is participating in the appointment.',
				types: () => [
					require('./patient.schema.js'),
					require('./practitioner.schema.js'),
					require('./practitionerrole.schema.js'),
					require('./relatedperson.schema.js'),
					require('./device.schema.js'),
					require('./healthcareservice.schema.js'),
					require('./location.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'Patient') {
						return require('./patient.schema.js');
					}
					if (data && data.resourceType === 'Practitioner') {
						return require('./practitioner.schema.js');
					}
					if (data && data.resourceType === 'PractitionerRole') {
						return require('./practitionerrole.schema.js');
					}
					if (data && data.resourceType === 'RelatedPerson') {
						return require('./relatedperson.schema.js');
					}
					if (data && data.resourceType === 'Device') {
						return require('./device.schema.js');
					}
					if (data && data.resourceType === 'HealthcareService') {
						return require('./healthcareservice.schema.js');
					}
					if (data && data.resourceType === 'Location') {
						return require('./location.schema.js');
					}
				},
			}),
			description:
				'A Person, Location, HealthcareService, or Device that is participating in the appointment.',
		},
		_participantStatus: {
			type: require('./element.schema.js'),
			description:
				'Participation status of the participant. When the status is declined or tentative if the start/end times are different to the appointment, then these times should be interpreted as a requested time change. When the status is accepted, the times can either be the time of the appointment (as a confirmation of the time) or can be empty.',
		},
		participantStatus: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'Participation status of the participant. When the status is declined or tentative if the start/end times are different to the appointment, then these times should be interpreted as a requested time change. When the status is accepted, the times can either be the time of the appointment (as a confirmation of the time) or can be empty.',
		},
		_comment: {
			type: require('./element.schema.js'),
			description: 'Additional comments about the appointment.',
		},
		comment: {
			type: GraphQLString,
			description: 'Additional comments about the appointment.',
		},
	}),
});
