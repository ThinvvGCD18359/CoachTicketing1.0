import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
import moment from 'moment';
// import busLogo from "../../../../images/buslogo.png";
// import phoneLogo from "../../../../images/telephone.png";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#FFFFFF",
    },
    section: {
        margin: 10,
        padding: 10,

        flexGrow: 1,
    },
    ticketBox: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        margin: 10,
    },
    titleBox: {
        flex: 1,
        flexDirection: "row",
        aligntickets: "center",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
    },
    logoBox: {
        flexDirection: "row",
        aligntickets: "center",
        justifyContent: "center",
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },

    companyTitle: {
        fontSize: 18,
        color: "#be3421",
    },
    queryBox: {
        flexDirection: "row",
        aligntickets: "flex-start",
        justifyContent: "center",
    },
    phoneLogo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    queryTitle: {
        fontSize: 11,
        fontWeight: "700",
    },
    queryNumber: {
        fontSize: 10,
    },

    travelInfoBox: {
        marginTop: 10,
        padding: 10,
        borderWidth: 3,
        borderColor: "yellow",
        backgroundColor: "#fce3e6",
        borderRight: 0,
        borderLeft: 0,
        flexDirection: "row",
        aligntickets: "center",
        justifyContent: "space-between",
    },
    travelInfoText: {
        fontSize: 11,
        fontWeight: "700",
    },

    passengerInfoBox: {
        marginTop: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "#c4ddff",
        borderRight: 0,
        borderLeft: 0,
        flexDirection: "row",
        aligntickets: "center",
        justifyContent: "space-between",
    },

    passengerInfoTextTitle: {
        fontSize: 10,
        color: "blue",
        textDecoration: "underline",
        fontWeight: "700",
        marginBottom: 5,
    },

    passengerInfoText: {
        fontSize: 11,
        fontWeight: "700",
    },

    busDetailTextTitle: {
        fontSize: 10,
        color: "blue",
        textDecoration: "underline",
        fontWeight: "700",
        marginBottom: 5,
    },

    busDetailText: {
        fontSize: 11,
        fontWeight: "700",
    },

    busDetailTextAddressTitle: {
        fontSize: 11,
        fontWeight: "700",
        marginRight: 10,
    },

    busDetailTextAddress: {
        fontSize: 11,
        fontWeight: "700",
        width: "80%",
    },

    busDetailOne: {
        marginTop: 10,
        borderWidth: 1,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: 0,
        flexDirection: "row",
        aligntickets: "flex-start",
        justifyContent: "flex-start",
    },

    busDetailTwo: {
        marginTop: 10,
        flexDirection: "row",
        aligntickets: "flex-start",
        justifyContent: "flex-start",
    },

    busDetailSubBox: {
        width: "27%",
        margin: 10,
    },

    busDetailAddress: {
        flexDirection: "row",
        aligntickets: "flex-start",
        justifyContent: "flex-start",
    },
});

function DetailTicket(props) {
    const { ticket } = props;
    console.log(ticket)
    return (
        <div className="bookedTickets">
            {Object.keys(ticket).length && (
                <PDFViewer width="90%" height="100%">
                    <Document>
                        <Page pageNumber={1} size="A4" style={styles.page}>
                            <View style={styles.ticketBox}>
                                <View key={ticket.id} style={styles.passengerInfoBox}>
                                    <View>
                                        <Text style={styles.passengerInfoTextTitle}>
                                            Ticket #
                                        </Text>
                                        <Text style={styles.passengerInfoText}>{ticket.id}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.passengerInfoTextTitle}>
                                            Passenger Name
                                        </Text>
                                        <Text style={styles.passengerInfoText}>{ticket.User.username}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.passengerInfoTextTitle}>Seat Numbers</Text>
                                        <Text style={styles.passengerInfoText}>{ticket.seat}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.passengerInfoTextTitle}>Gender</Text>
                                        <Text style={styles.passengerInfoText}>{ticket.User.gender}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.passengerInfoTextTitle}>Age</Text>
                                        <Text style={styles.passengerInfoText}>{ticket.User.age}</Text>
                                    </View>
                                </View>

                                <View style={styles.busDetailOne}>
                                    <View style={styles.busDetailSubBox}>
                                        <Text style={styles.busDetailTextTitle}>Coach</Text>
                                        <Text style={styles.busDetailText}>
                                            {ticket.Coach.name}
                                        </Text>
                                    </View>
                                    <View style={styles.busDetailSubBox}>
                                        <Text style={styles.busDetailTextTitle}>Plates</Text>
                                        <Text style={styles.busDetailText}>
                                            {ticket.Coach.plates}
                                        </Text>
                                    </View>
                                    <View style={styles.busDetailSubBox}>
                                        <Text style={styles.busDetailTextTitle}>From</Text>
                                        <Text style={styles.busDetailTextAddress}>
                                            {ticket.Coach.Route.starting}
                                        </Text>
                                    </View>
                                    <View style={styles.busDetailSubBox}>
                                        <Text style={styles.busDetailTextTitle}>To</Text>
                                        <Text style={styles.busDetailTextAddress}>
                                            {ticket.Coach.Route.destination}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.busDetailTwo}>
                                    <View style={styles.busDetailSubBox}>
                                        <Text style={styles.busDetailTextTitle}>Total Cost</Text>
                                        <Text style={styles.busDetailText}>$ {ticket.price}</Text>
                                    </View>
                                    <View style={styles.busDetailSubBox}>
                                        <Text style={styles.busDetailTextTitle}>Departure Time</Text>
                                        <Text style={styles.busDetailText}>
                                            {moment(ticket.Coach.Route.departure).format('MM-DD-YYYY, HH:mm')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            )}
        </div>
    );
}

export default DetailTicket;