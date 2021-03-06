const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLUnionType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLInt,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');
const DateTimeScalar = require('../scalars/datetime.scalar.js');
const InstantScalar = require('../scalars/instant.scalar.js');
const TimeScalar = require('../scalars/time.scalar.js');

/**
 * @name exports
 * @summary Observation Schema
 */
module.exports = new GraphQLObjectType({
	name: 'Observation',
	description:
		'Measurements and simple assertions made about a patient, device or other subject.',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'Observation_Enum_schema',
					values: { Observation: { value: 'Observation' } },
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
			description: 'A unique identifier assigned to this observation.',
		},
		basedOn: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'ObservationbasedOn_basedOn_Union',
					description:
						'A plan, proposal or order that is fulfilled in whole or in part by this event.  For example, a MedicationRequest may require a patient to have laboratory test performed before  it is dispensed.',
					types: () => [
						require('./careplan.schema.js'),
						require('./devicerequest.schema.js'),
						require('./immunizationrecommendation.schema.js'),
						require('./medicationrequest.schema.js'),
						require('./nutritionorder.schema.js'),
						require('./servicerequest.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'CarePlan') {
							return require('./careplan.schema.js');
						}
						if (data && data.resourceType === 'DeviceRequest') {
							return require('./devicerequest.schema.js');
						}
						if (data && data.resourceType === 'ImmunizationRecommendation') {
							return require('./immunizationrecommendation.schema.js');
						}
						if (data && data.resourceType === 'MedicationRequest') {
							return require('./medicationrequest.schema.js');
						}
						if (data && data.resourceType === 'NutritionOrder') {
							return require('./nutritionorder.schema.js');
						}
						if (data && data.resourceType === 'ServiceRequest') {
							return require('./servicerequest.schema.js');
						}
					},
				}),
			),
			description:
				'A plan, proposal or order that is fulfilled in whole or in part by this event.  For example, a MedicationRequest may require a patient to have laboratory test performed before  it is dispensed.',
		},
		partOf: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'ObservationpartOf_partOf_Union',
					description:
						'A larger event of which this particular Observation is a component or step.  For example,  an observation as part of a procedure.',
					types: () => [
						require('./medicationadministration.schema.js'),
						require('./medicationdispense.schema.js'),
						require('./medicationstatement.schema.js'),
						require('./procedure.schema.js'),
						require('./immunization.schema.js'),
						require('./imagingstudy.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'MedicationAdministration') {
							return require('./medicationadministration.schema.js');
						}
						if (data && data.resourceType === 'MedicationDispense') {
							return require('./medicationdispense.schema.js');
						}
						if (data && data.resourceType === 'MedicationStatement') {
							return require('./medicationstatement.schema.js');
						}
						if (data && data.resourceType === 'Procedure') {
							return require('./procedure.schema.js');
						}
						if (data && data.resourceType === 'Immunization') {
							return require('./immunization.schema.js');
						}
						if (data && data.resourceType === 'ImagingStudy') {
							return require('./imagingstudy.schema.js');
						}
					},
				}),
			),
			description:
				'A larger event of which this particular Observation is a component or step.  For example,  an observation as part of a procedure.',
		},
		_status: {
			type: require('./element.schema.js'),
			description: 'The status of the result value.',
		},
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'The status of the result value.',
		},
		category: {
			type: new GraphQLList(require('./codeableconcept.schema.js')),
			description:
				'A code that classifies the general type of observation being made.',
		},
		code: {
			type: new GraphQLNonNull(require('./codeableconcept.schema.js')),
			description:
				"Describes what was observed. Sometimes this is called the observation 'name'.",
		},
		subject: {
			type: new GraphQLUnionType({
				name: 'Observationsubject_subject_Union',
				description:
					'The patient, or group of patients, location, or device this observation is about and into whose record the observation is placed. If the actual focus of the observation is different from the subject (or a sample of, part, or region of the subject), the `focus` element or the `code` itself specifies the actual focus of the observation.',
				types: () => [
					require('./patient.schema.js'),
					require('./group.schema.js'),
					require('./device.schema.js'),
					require('./location.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'Patient') {
						return require('./patient.schema.js');
					}
					if (data && data.resourceType === 'Group') {
						return require('./group.schema.js');
					}
					if (data && data.resourceType === 'Device') {
						return require('./device.schema.js');
					}
					if (data && data.resourceType === 'Location') {
						return require('./location.schema.js');
					}
				},
			}),
			description:
				'The patient, or group of patients, location, or device this observation is about and into whose record the observation is placed. If the actual focus of the observation is different from the subject (or a sample of, part, or region of the subject), the `focus` element or the `code` itself specifies the actual focus of the observation.',
		},
		focus: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'Observationfocus_focus_Union',
					description:
						"The actual focus of an observation when it is not the patient of record representing something or someone associated with the patient such as a spouse, parent, fetus, or donor. For example, fetus observations in a mother's record.  The focus of an observation could also be an existing condition,  an intervention, the subject's diet,  another observation of the subject,  or a body structure such as tumor or implanted device.   An example use case would be using the Observation resource to capture whether the mother is trained to change her child's tracheostomy tube. In this example, the child is the patient of record and the mother is the focus.",
					types: () => [require('./resource.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'Resource') {
							return require('./resource.schema.js');
						}
					},
				}),
			),
			description:
				"The actual focus of an observation when it is not the patient of record representing something or someone associated with the patient such as a spouse, parent, fetus, or donor. For example, fetus observations in a mother's record.  The focus of an observation could also be an existing condition,  an intervention, the subject's diet,  another observation of the subject,  or a body structure such as tumor or implanted device.   An example use case would be using the Observation resource to capture whether the mother is trained to change her child's tracheostomy tube. In this example, the child is the patient of record and the mother is the focus.",
		},
		encounter: {
			type: new GraphQLUnionType({
				name: 'Observationencounter_encounter_Union',
				description:
					'The healthcare event  (e.g. a patient and healthcare provider interaction) during which this observation is made.',
				types: () => [require('./encounter.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Encounter') {
						return require('./encounter.schema.js');
					}
				},
			}),
			description:
				'The healthcare event  (e.g. a patient and healthcare provider interaction) during which this observation is made.',
		},
		_effectiveDateTime: {
			type: require('./element.schema.js'),
			description:
				"The time or time-period the observed value is asserted as being true. For biological subjects - e.g. human patients - this is usually called the 'physiologically relevant time'. This is usually either the time of the procedure or of specimen collection, but very often the source of the date/time is not known, only the date/time itself.",
		},
		effectiveDateTime: {
			type: DateTimeScalar,
			description:
				"The time or time-period the observed value is asserted as being true. For biological subjects - e.g. human patients - this is usually called the 'physiologically relevant time'. This is usually either the time of the procedure or of specimen collection, but very often the source of the date/time is not known, only the date/time itself.",
		},
		effectivePeriod: {
			type: require('./period.schema.js'),
			description:
				"The time or time-period the observed value is asserted as being true. For biological subjects - e.g. human patients - this is usually called the 'physiologically relevant time'. This is usually either the time of the procedure or of specimen collection, but very often the source of the date/time is not known, only the date/time itself.",
		},
		effectiveTiming: {
			type: require('./timing.schema.js'),
			description:
				"The time or time-period the observed value is asserted as being true. For biological subjects - e.g. human patients - this is usually called the 'physiologically relevant time'. This is usually either the time of the procedure or of specimen collection, but very often the source of the date/time is not known, only the date/time itself.",
		},
		_effectiveInstant: {
			type: require('./element.schema.js'),
			description:
				"The time or time-period the observed value is asserted as being true. For biological subjects - e.g. human patients - this is usually called the 'physiologically relevant time'. This is usually either the time of the procedure or of specimen collection, but very often the source of the date/time is not known, only the date/time itself.",
		},
		effectiveInstant: {
			type: InstantScalar,
			description:
				"The time or time-period the observed value is asserted as being true. For biological subjects - e.g. human patients - this is usually called the 'physiologically relevant time'. This is usually either the time of the procedure or of specimen collection, but very often the source of the date/time is not known, only the date/time itself.",
		},
		_issued: {
			type: require('./element.schema.js'),
			description:
				'The date and time this version of the observation was made available to providers, typically after the results have been reviewed and verified.',
		},
		issued: {
			type: InstantScalar,
			description:
				'The date and time this version of the observation was made available to providers, typically after the results have been reviewed and verified.',
		},
		performer: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'Observationperformer_performer_Union',
					description:
						"Who was responsible for asserting the observed value as 'true'.",
					types: () => [
						require('./practitioner.schema.js'),
						require('./practitionerrole.schema.js'),
						require('./organization.schema.js'),
						require('./careteam.schema.js'),
						require('./patient.schema.js'),
						require('./relatedperson.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'Practitioner') {
							return require('./practitioner.schema.js');
						}
						if (data && data.resourceType === 'PractitionerRole') {
							return require('./practitionerrole.schema.js');
						}
						if (data && data.resourceType === 'Organization') {
							return require('./organization.schema.js');
						}
						if (data && data.resourceType === 'CareTeam') {
							return require('./careteam.schema.js');
						}
						if (data && data.resourceType === 'Patient') {
							return require('./patient.schema.js');
						}
						if (data && data.resourceType === 'RelatedPerson') {
							return require('./relatedperson.schema.js');
						}
					},
				}),
			),
			description:
				"Who was responsible for asserting the observed value as 'true'.",
		},
		valueQuantity: {
			type: require('./quantity.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueCodeableConcept: {
			type: require('./codeableconcept.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		_valueString: {
			type: require('./element.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueString: {
			type: GraphQLString,
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		_valueBoolean: {
			type: require('./element.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueBoolean: {
			type: GraphQLBoolean,
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		_valueInteger: {
			type: require('./element.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueInteger: {
			type: GraphQLInt,
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueRange: {
			type: require('./range.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueRatio: {
			type: require('./ratio.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueSampledData: {
			type: require('./sampleddata.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		_valueTime: {
			type: require('./element.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueTime: {
			type: TimeScalar,
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		_valueDateTime: {
			type: require('./element.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valueDateTime: {
			type: DateTimeScalar,
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		valuePeriod: {
			type: require('./period.schema.js'),
			description:
				'The information determined as a result of making the observation, if the information has a simple value.',
		},
		dataAbsentReason: {
			type: require('./codeableconcept.schema.js'),
			description:
				'Provides a reason why the expected value in the element Observation.value[x] is missing.',
		},
		interpretation: {
			type: new GraphQLList(require('./codeableconcept.schema.js')),
			description:
				'A categorical assessment of an observation value.  For example, high, low, normal.',
		},
		note: {
			type: new GraphQLList(require('./annotation.schema.js')),
			description: 'Comments about the observation or the results.',
		},
		bodySite: {
			type: require('./codeableconcept.schema.js'),
			description:
				"Indicates the site on the subject's body where the observation was made (i.e. the target site).",
		},
		method: {
			type: require('./codeableconcept.schema.js'),
			description: 'Indicates the mechanism used to perform the observation.',
		},
		specimen: {
			type: new GraphQLUnionType({
				name: 'Observationspecimen_specimen_Union',
				description:
					'The specimen that was used when this observation was made.',
				types: () => [require('./specimen.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Specimen') {
						return require('./specimen.schema.js');
					}
				},
			}),
			description: 'The specimen that was used when this observation was made.',
		},
		device: {
			type: new GraphQLUnionType({
				name: 'Observationdevice_device_Union',
				description: 'The device used to generate the observation data.',
				types: () => [
					require('./device.schema.js'),
					require('./devicemetric.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'Device') {
						return require('./device.schema.js');
					}
					if (data && data.resourceType === 'DeviceMetric') {
						return require('./devicemetric.schema.js');
					}
				},
			}),
			description: 'The device used to generate the observation data.',
		},
		referenceRange: {
			type: new GraphQLList(require('./observationreferencerange.schema.js')),
			description:
				"Guidance on how to interpret the value by comparison to a normal or recommended range.  Multiple reference ranges are interpreted as an 'OR'.   In other words, to represent two distinct target populations, two `referenceRange` elements would be used.",
		},
		hasMember: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'ObservationhasMember_hasMember_Union',
					description:
						'This observation is a group observation (e.g. a battery, a panel of tests, a set of vital sign measurements) that includes the target as a member of the group.',
					types: () => [
						require('./observation.schema.js'),
						require('./questionnaireresponse.schema.js'),
						require('./molecularsequence.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'Observation') {
							return require('./observation.schema.js');
						}
						if (data && data.resourceType === 'QuestionnaireResponse') {
							return require('./questionnaireresponse.schema.js');
						}
						if (data && data.resourceType === 'MolecularSequence') {
							return require('./molecularsequence.schema.js');
						}
					},
				}),
			),
			description:
				'This observation is a group observation (e.g. a battery, a panel of tests, a set of vital sign measurements) that includes the target as a member of the group.',
		},
		derivedFrom: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'ObservationderivedFrom_derivedFrom_Union',
					description:
						'The target resource that represents a measurement from which this observation value is derived. For example, a calculated anion gap or a fetal measurement based on an ultrasound image.',
					types: () => [
						require('./documentreference.schema.js'),
						require('./imagingstudy.schema.js'),
						require('./media.schema.js'),
						require('./questionnaireresponse.schema.js'),
						require('./observation.schema.js'),
						require('./molecularsequence.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'DocumentReference') {
							return require('./documentreference.schema.js');
						}
						if (data && data.resourceType === 'ImagingStudy') {
							return require('./imagingstudy.schema.js');
						}
						if (data && data.resourceType === 'Media') {
							return require('./media.schema.js');
						}
						if (data && data.resourceType === 'QuestionnaireResponse') {
							return require('./questionnaireresponse.schema.js');
						}
						if (data && data.resourceType === 'Observation') {
							return require('./observation.schema.js');
						}
						if (data && data.resourceType === 'MolecularSequence') {
							return require('./molecularsequence.schema.js');
						}
					},
				}),
			),
			description:
				'The target resource that represents a measurement from which this observation value is derived. For example, a calculated anion gap or a fetal measurement based on an ultrasound image.',
		},
		component: {
			type: new GraphQLList(require('./observationcomponent.schema.js')),
			description:
				'Some observations have multiple component observations.  These component observations are expressed as separate code value pairs that share the same attributes.  Examples include systolic and diastolic component observations for blood pressure measurement and multiple component observations for genetics observations.',
		},
	}),
});
